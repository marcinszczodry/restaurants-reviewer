<template>
  <div>
    <google-map
      :center="userGeolocation ? userGeolocation : mapCenter"
      :zoom="mapZoom"
      @map-init="handleMapInit"
    >
      <google-map-anchor
        v-if="userGeolocation"
        :position="userGeolocation"
        :range="restaurantsMaximumRange"
      />
      <google-map-marker-cluster
        v-if="restaurants"
      >
        <google-map-restaurant
          v-for="restaurant in restaurants"
          :key="restaurant.id"
          :position="restaurant.geometry.location"
        />
      </google-map-marker-cluster>
    </google-map>
    <base-right-pane>
      <p v-if="!restaurants">
        Loading ...
      </p>
      <restaurants-list
        v-else-if="restaurants.length > 0"
        :list="restaurants"
      />
      <p v-else-if="restaurants.length < 1">
        Sorry, there's no restaurants matching these criteria.
      </p>
    </base-right-pane>
    <restaurants-filters-pane
      v-if="userGeolocation"
    >
      <filter-by-distance
        :value="restaurantsMaximumRange"
        :min="100"
        :max="1000"
        @rangeChange="handleRangeChange"
      />
      <filter-by-rating
        :min="filterMinRating"
        :max="filterMaxRating"
        @min="handleMinimumRating"
        @max="handleMaximumRating"
      />
    </restaurants-filters-pane>
  </div>
</template>

<style lang="scss">
</style>

<script>
import GoogleMap from '@/components/GoogleMap.vue';
import GoogleMapAnchor from '@/components/GoogleMapAnchor.vue';
import GoogleMapRestaurant from '@/components/GoogleMapRestaurant.vue';
import GoogleMapMarkerCluster from '@/components/GoogleMapMarkerCluster.vue';
import BaseRightPane from '@/components/BaseRightPane.vue';
import RestaurantsList from '@/components/RestaurantsList.vue';
import RestaurantsFiltersPane from '@/components/RestaurantsFiltersPane.vue';
import FilterByDistance from '@/components/FilterByDistance.vue';
import FilterByRating from '@/components/FilterByRating.vue';


export default {
  components: {
    FilterByDistance,
    FilterByRating,
    RestaurantsFiltersPane,
    RestaurantsList,
    BaseRightPane,
    GoogleMapMarkerCluster,
    GoogleMapAnchor,
    GoogleMapRestaurant,
    GoogleMap,
  },
  data() {
    return {
      google: null,
      googleMap: null,
      map: {
        // by default fallback to england's coordinates
        center: { lat: 52.3555, lng: -1.1743 },
        zoom: 7,
      },
      status: {
        userGeolocationFinished: false,
        mapInitialized: false,
      },
      userGeolocation: null,
      restaurantsGoogleList: null,
      restaurantsLocalList: null,
      restaurantsMaximumRange: 100, // temporarily
      filterMinimumRatingValue: 1,
      filterMaximumRatingValue: 5,
    };
  },
  computed: {
    mapCenter() {
      return this.map.center;
    },
    mapZoom() {
      return this.map.zoom;
    },
    restaurants() {
      let list = null;
      if (this.google) {
        if (this.restaurantsGoogleList) {
          if (!Array.isArray(list)) list = [];
          list = list.concat(this.restaurantsGoogleList);
        }
        if (this.restaurantsLocalList) {
          if (!Array.isArray(list)) list = [];
          const localList = this.restaurantsLocalList.filter((res) => {
            const distance = this.getDistanceBetweenTwoLatLng(
              res.geometry.location, this.userGeolocation,
            );
            return distance <= this.restaurantsMaximumRange;
          });
          list = list.concat(localList);
        }
        if (Array.isArray(list)) {
          // eslint-disable-next-line max-len
          list = list.filter((res) => res.rating >= this.filterMinRating && res.rating <= this.filterMaxRating);
        }
      }
      return list;
    },
    filterMinRating() {
      return this.filterMinimumRatingValue;
    },
    filterMaxRating() {
      return this.filterMaximumRatingValue;
    },
  },
  watch: {
    userGeolocation(coords) {
      this.map.zoom = 16;
      this.map.center = coords;
      if (this.googleMap) this.fetchGoogleRestaurants();
    },
    status: {
      handler({ mapInitialized }) {
        if (this.userGeolocation && mapInitialized) this.fetchGoogleRestaurants();
      },
      deep: true,
    },
    restaurantsMaximumRange: {
      handler() {
        this.fetchGoogleRestaurants();
      },
    },
  },
  async created() {
    this.userGeolocation = await this.getUserPosition();
    await this.fetchLocalRestaurants();
  },
  methods: {
    handleMapInit({ google, map }) {
      this.google = google;
      this.googleMap = map;
      this.status.mapInitialized = true;
    },
    async getUserPosition() {
      let location = null;
      let message = null;
      const { geolocation } = navigator;
      try {
        if (!geolocation) return new Error('Looks like your browser does not support geolocation.');
        if (geolocation) {
          location = await new Promise((resolve, reject) => {
            const success = ({ latitude, longitude }) => {
              const coordinates = { lat: latitude, lng: longitude };
              resolve(coordinates);
            };
            const failure = (error) => {
              if (error === 1) message = 'Looks like you didn\'t let us use your location. Please enter it manually.';
              if (error === 2) message = 'We\'re having troubles to get your location. Please check your connection.';
              if (error === 3) message = 'It\'s taken to much time to obtain your location. Please enter it manually.';
              reject(message);
            };
            geolocation.getCurrentPosition(
              (pos) => success(pos.coords),
              (err) => failure(err.code),
            );
          });
        }
      } catch (error) {
        // eslint-disable-next-line
        console.warn(error);
      }
      this.status.userGeolocationFinished = true;
      return location;
    },
    async fetchGoogleRestaurants() {
      const { PlacesService, PlacesServiceStatus } = this.google.maps.places;
      const service = new PlacesService(this.googleMap);
      const request = {
        location: this.userGeolocation,
        radius: this.restaurantsMaximumRange,
        type: [
          'restaurant',
        ],
      };
      let extractedRestaurantsDetails = [];
      await service.nearbySearch(request, (results, status, pagination) => {
        if (status === PlacesServiceStatus.OK) {
          results.forEach((r) => {
            const {
              /* eslint-disable camelcase */
              place_id,
              name,
              geometry,
              rating,
              user_ratings_total,
              /* eslint-enable camelcase */
            } = r;
            const singleRestaurantDetails = {
              id: place_id,
              name,
              geometry,
              rating,
              ratingCount: user_ratings_total,
            };
            extractedRestaurantsDetails = [...extractedRestaurantsDetails, singleRestaurantDetails];
          });
          if (pagination.hasNextPage) {
            pagination.nextPage();
          } else {
            this.restaurantsGoogleList = extractedRestaurantsDetails;
          }
        }
      });
    },
    async fetchLocalRestaurants() {
      await fetch('https://api.jsonbin.io/b/5de917951c19843d88e6f7f6/4')
        .then((res) => res.json())
        .then((json) => {
          this.restaurantsLocalList = json;
        });
    },
    getDistanceBetweenTwoLatLng(latlng1, latlng2) {
      const toLatLng = (obj) => new this.google.maps.LatLng(obj);
      const { computeDistanceBetween } = this.google.maps.geometry.spherical;
      return computeDistanceBetween(toLatLng(latlng1), toLatLng(latlng2));
    },
    handleRangeChange(newRangeValue) {
      this.restaurantsMaximumRange = +newRangeValue;
    },
    handleMinimumRating(minValue) {
      this.filterMinimumRatingValue = +minValue;
    },
    handleMaximumRating(maxValue) {
      this.filterMaximumRatingValue = +maxValue;
    },
  },
};
</script>
