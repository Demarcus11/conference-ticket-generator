# React Router tutorial

## Routing

- root.tsx: entry point of the app, file where you can define the layout of the app.

```tsx
// root.tsx, header will display on every route, <Outlet /> is equal to <slot /> for each route
export default function App() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
```

- routes.ts: file where you define the routes of the app. For the index route you use the index() function. For other routes you must import the route function and add another route to the array. The route() function takes 2 parameters: route name and path to component.

```tsx
import { type RouteConfig, index, route } from "@react-router/dev/routes";

// this is saying render the initial page (index) from routes/home.tsx
export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
] satisfies RouteConfig;

// about.tsx, Route components must export default or you'll get an error
export default function About() {
  return <p>About</p>;
}
```

## Route components that accept params

Route files that need to need data before rendering you need a loader(). If youe route has route params then you'll need to fetch it inside the loader().

If your route needs to handle form submissions or POST/PUT/DELETE logic then you'll need an action() function.

You'll only need these if your route file needs them, if they dont then you dont have to include these functions. Also you dont need both if you only need 1 of them, so you can have a loader() without an action() and vice versa.

```tsx
// routes.ts
export default [
  index("routes/home.tsx"),
  route("post/:postId", "routes/post.tsx"),
] satisfies RouteConfig;

// routes/post.tsx
import type { Route } from "./+types/post";

// fetch route param
export async function loader({ params }: Route.LoaderArgs) {
  const postId = params.postId;
  return { postId };
}

export async function action() {}

// you could also destructure the loaderData to grab the postId: Post({{ postId }})
export default function Post({ loaderData }: Route.ComponentProps) {
  return <p>Post id {loaderData.postId}</p>;
}
```

## Nested routes

Add an array to the route() definition to add nested routes. Then inside the parent route, you need to add an <Outlet /> to display the nested route content.

```tsx
// routes.ts
export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("dashboard", "routes/dashboard.tsx", [
    route("finances", "routes/finances.tsx"),
  ]),
] satisfies RouteConfig;

// routes/dashboard.ts
import { Outlet } from "react-router";

export default function Dashboard() {
  return (
    <div>
      Dashboard Page
      <Outlet />
    </div>
  );
}
```

## Layouts

Instead of the route() function, use the layout() to have a layout. To organize your files better, since its not file based routing you can just add a folder to group files such as dashboard -> dashboard-layout.tsx, finances.tsx. The URL will be /finances, no dashboard prefix.

```tsx
// route.ts

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  layout("routes/dashboard/dashboard-layout.tsx", [
    route("finances", "routes/dashboard/finances.tsx"),
  ]),
] satisfies RouteConfig;
```

## Route prefix

To add a route prefix such as /dashboard/finances:

```tsx
// route.ts

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  layout("routes/dashboard/dashboard-layout.tsx", [
    ...prefix("dashboard", [
      route("finances", "routes/dashboard/finances.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
```

## Project Details

If this were a real application then there would need to be a database. When the user completes the form, you would store their information in the database using their unique UUID generated, for example, /ticket/123snswni-qjjw-jswj1-123js.

On any page that needs that information from that form, would fetch using that UUID from the URL. Since this is just a frontend mentor project, there's no db. So in order to access the data in any component that needs it, we'll need a state management tool.
