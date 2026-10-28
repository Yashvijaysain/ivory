# Ivory County website replica

A self-contained static replica of the Ivory County marketing page.

## Preview

Serve the `dist` directory with any static server. For example:

```powershell
npx serve dist
```

The replica keeps the reference site's responsive layout, hero video, amenities, location tabs, project cards, RERA section, inquiry modal, mobile navigation, and footer. It is fully self-contained: all runtime assets and libraries are local, external analytics/chat/maps are removed, navigation stays inside the single-page site, and the inquiry form uses a local confirmation instead of transmitting visitor data.
