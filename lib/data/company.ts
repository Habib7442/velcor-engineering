export const company = {
  name: "Velcor Engineering",
  email: "info@velcorengineering.com",
  phone: {
    display: "+91 99578 82204",
    href: "tel:+919957882204",
  },
  address: "331, Khola Pt II, Sribhumi, Assam, 788701, India",
  // Structured for schema.org PostalAddress (LocalBusiness JSON-LD) --
  // kept in sync with the display string above by hand, since it's a
  // handful of fields, not worth parsing the string at runtime.
  addressParts: {
    streetAddress: "331, Khola Pt II",
    addressLocality: "Sribhumi",
    addressRegion: "Assam",
    postalCode: "788701",
    addressCountry: "IN",
  },
  // Lifted directly from the Google Maps embed URL below (the `3d`/`2d`
  // params are latitude/longitude) -- real coordinates, not estimated.
  geo: {
    latitude: 24.797231571622877,
    longitude: 92.42803286864584,
  },
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42421.60441901296!2d92.42803286864584!3d24.797231571622877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x374e2a046391ef15%3A0x102989ce8bc4fd!2sKhola%20Pt%20II%2C%20Assam%20788701!5e0!3m2!1sen!2sin!4v1784387880024!5m2!1sen!2sin",
  mapTitle: "Velcor Engineering — office location",
};
