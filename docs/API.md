# REST API Reference

Base URL: `http://localhost:5000/api` (production: your Render/AWS URL)

## Public Endpoints

### Products
- `GET /products` — Query: `page`, `limit`, `category` (door|window), `search`, `featured`
- `GET /products/slug/:slug` — Single product
- `GET /products/:id` — By MongoDB ID

### Content
- `GET /categories`
- `GET /gallery` — Query: `featured`, `limit`
- `GET /testimonials`
- `GET /faqs` — Query: `category`, `search`

### Forms
- `POST /contact` — Body: `{ name, phone, email, city, requirement, message }`
- `POST /orders` — Body: `{ name, phone, email, city, items[], referenceImage?, additionalNotes? }`

## Admin Endpoints

All require header: `X-Api-Key: <ADMIN_API_KEY>`

- `GET /admin/dashboard`
- `GET|POST /admin/products`
- `PUT|DELETE /admin/products/:id`
- `GET|POST /admin/categories`
- `PUT|DELETE /admin/categories/:id`
- `GET|POST /admin/gallery`
- `PUT|DELETE /admin/gallery/:id`
- `GET|POST /admin/testimonials`
- `PUT|DELETE /admin/testimonials/:id`
- `GET|POST /admin/faqs`
- `PUT|DELETE /admin/faqs/:id`
- `GET /admin/contacts`
- `PATCH /admin/contacts/:id` — Body: `{ status }`
- `GET /admin/orders`
- `PATCH /admin/orders/:id` — Body: `{ status }`

## Health
- `GET /health`
