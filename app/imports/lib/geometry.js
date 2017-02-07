/*
  distanceFrom()
  from https://stackoverflow.com/questions/15530404/geolocation-watchposition-distance-calculator

  usage:

  let distance = distanceFrom({
      // NYC
      'lat1': 40.713955826286046,
      'lng1': -74.00665283203125,
      // Philly
      'lat2': 39.952335,
      'lng2': -75.163789
  });

  return value is in km
*/

export const distanceFrom = (points) => {
  let lat1 = points.lat1;
  let radianLat1 = lat1 * (Math.PI / 180);
  let lng1 = points.lng1;
  let radianLng1 = lng1 * (Math.PI / 180);
  let lat2 = points.lat2;
  let radianLat2 = lat2 * (Math.PI / 180);
  let lng2 = points.lng2;
  let radianLng2 = lng2 * (Math.PI / 180);
  let earth_radius = 6371; // or 6371 for kilometers
  let diffLat = (radianLat1 - radianLat2);
  let diffLng = (radianLng1 - radianLng2);
  let sinLat = Math.sin(diffLat / 2);
  let sinLng = Math.sin(diffLng / 2);
  let a = Math.pow(sinLat, 2.0) + Math.cos(radianLat1) * Math.cos(radianLat2) * Math.pow(sinLng, 2.0);
  let distance = earth_radius * 2 * Math.asin(Math.min(1, Math.sqrt(a)));

  return distance.toFixed(3);
}