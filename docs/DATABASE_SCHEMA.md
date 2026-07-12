# Database Schema

## Collections

### products
| Field | Type | Description |
|-------|------|-------------|
| name | String | Product name |
| slug | String | URL-friendly unique identifier |
| category | Enum | `door` \| `window` |
| subcategory | String | e.g. `sliding-windows` |
| description | String | Full description |
| shortDescription | String | Card summary |
| image | String | Primary image URL |
| gallery | [String] | Additional images |
| specifications | [{label, value}] | Key specs |
| sizes | [{width, height, label}] | Available sizes |
| frameMaterial | [String] | Frame options |
| glassOptions | [String] | Glass types |
| colorOptions | [String] | Color finishes |
| hardwareOptions | [String] | Hardware choices |
| applications | [String] | Use cases |
| features | [String] | Feature tags |
| brochureUrl | String? | PDF download link |
| featured | Boolean | Show on homepage |
| order | Number | Sort order |

**Indexes:** `slug` (unique), `category + subcategory`

### categories
| Field | Type |
|-------|------|
| name | String |
| slug | String (unique) |
| type | `door` \| `window` |
| description | String |
| image | String? |
| order | Number |

### gallery
| Field | Type |
|-------|------|
| title | String |
| image | String |
| category | String |
| featured | Boolean |
| order | Number |

### testimonials
| Field | Type |
|-------|------|
| name | String |
| role | String |
| city | String |
| content | String |
| rating | Number (1-5) |
| image | String? |
| featured | Boolean |

### faqs
| Field | Type |
|-------|------|
| question | String |
| answer | String |
| category | installation \| warranty \| pricing \| maintenance \| delivery \| general |
| order | Number |

### contactrequests
| Field | Type |
|-------|------|
| name, phone, email, city | String |
| requirement | String |
| message | String |
| status | new \| contacted \| closed |

### orderrequests
| Field | Type |
|-------|------|
| name, phone, email, city | String |
| items | [{productId, productName, quantity, width?, height?, requirements?}] |
| referenceImage | String? (base64) |
| additionalNotes | String? |
| status | new \| processing \| completed \| cancelled |
