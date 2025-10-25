
# Project ShopApp Admin FrontEnd (NextJS)


## Technology Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** TailwindCSS

## File Tree: Project_ShopApp_Admin_FrontEnd_NextJS

```
└── 📁 frontend
    ├── 📁 public
    │   ├── 📁 images
    │   │   ├── 🖼️ edit-icon.png
    │   │   ├── 🖼️ plus.png
    │   │   ├── 🖼️ refresh.png
    │   │   ├── 🖼️ reload.png
    │   │   ├── 🖼️ trash.png
    │   │   └── 🖼️ wardrobe.png
    │   ├── 🖼️ avatar.png
    │   ├── 🖼️ english.png
    │   └── 🖼️ hcmuteAdmin.png
    ├── 📁 src
    │   ├── 📁 app
    │   │   ├── 📁 categories
    │   │   │   ├── 📄 CategoryForm.tsx
    │   │   │   └── 📄 page.tsx
    │   │   ├── 📁 coupons
    │   │   │   └── 📄 page.tsx
    │   │   ├── 📁 dashboard
    │   │   │   └── 📄 page.tsx
    │   │   ├── 📁 login
    │   │   │   └── 📄 page.tsx
    │   │   ├── 📁 notifications
    │   │   │   └── 📄 page.tsx
    │   │   ├── 📁 orders
    │   │   │   └── 📄 page.tsx
    │   │   ├── 📁 products
    │   │   │   ├── 📁 add
    │   │   │   │   └── 📄 page.tsx
    │   │   │   ├── 📁 edit
    │   │   │   │   └── 📁 [id]
    │   │   │   │       └── 📄 page.tsx
    │   │   │   └── 📄 page.tsx
    │   │   ├── 📁 public
    │   │   │   └── 🖼️ image.png
    │   │   ├── 📁 uploadimage
    │   │   │   └── 📄 page.tsx
    │   │   ├── 📁 users
    │   │   │   └── 📄 page.tsx
    │   │   ├── 🎨 globals.css
    │   │   ├── 📄 layout.tsx
    │   │   └── 📄 page.tsx
    │   ├── 📁 components
    │   │   ├── 📁 coupons
    │   │   │   ├── 📄 AddCouponForm.tsx
    │   │   │   ├── 🎨 CouponFilter.module.css
    │   │   │   ├── 📄 CouponFilter.tsx
    │   │   │   ├── 📄 CouponTable.tsx
    │   │   │   ├── 📄 CouponsStatusBadge.tsx
    │   │   │   ├── 📄 ToggleSwitch.tsx
    │   │   │   └── 📄 UpdateCouponForm.tsx
    │   │   ├── 📁 dashboard
    │   │   │   ├── 📄 DashboardSummary.tsx
    │   │   │   ├── 📄 DealDetail.tsx
    │   │   │   └── 📄 SalesChart.tsx
    │   │   ├── 📁 layout
    │   │   │   ├── 📄 Footer.tsx
    │   │   │   ├── 📄 Header.tsx
    │   │   │   └── 📄 Sidebar.tsx
    │   │   ├── 📁 notification
    │   │   ├── 📄 AddNotificationForm.tsx
    │   │   │   ├── 🎨 NotificationFilter.module.css
    │   │   │   ├── 📄 NotificationFilter.tsx
    │   │   │   └── 📄 NotificationTable.tsx
    │   │   ├── 📁 orders
    │   │   │   ├── 📁 detail
    │   │   │   │   ├── 📄 InfoCard.tsx
    │   │   │   │   ├── 📄 ItemsTable.tsx
    │   │   │   │   ├── 📄 OrderStatusUpdate.tsx
    │   │   │   │   └── 📄 PricingCard.tsx
    │   │   │   ├── 📄 OrderDetailModal.tsx
    │   │   │   ├── 📄 OrderFilter.tsx
    │   │   │   ├── 📄 OrderStatusBadge.tsx
    │   │   │   └── 📄 OrderTable.tsx
    │   │   ├── 📁 products
    │   │   │   ├── 📄 addProduct.tsx
    │   │   │   ├── 📄 editProduct.tsx
    │   │   │   ├── 🎨 productList.css
    │   │   │   └── 📄 productList.tsx
    │   │   ├── 📁 users
    │   │   │   ├── 📄 FilterDropdown.tsx
    │   │   │   ├── 📄 PaginationFooter.tsx
    │   │   │   ├── 📄 UserFilter.tsx
    │   │   │   ├── 📄 UserFormModal.tsx
    │   │   │   ├── 📄 UserStatusBadge.tsx
    │   │   │   └── 📄 UserTable.tsx
    │   │   ├── 📄 ProtectedRoute.tsx
    │   │   └── 📄 UploadImage.tsx
    │   ├── 📁 hooks
    │   │   └── 📄 useDebounce.ts
    │   ├── 📁 lib
    │   │   ├── 📄 api.ts
    │   │   └── 📄 utils.ts
    │   ├── 📁 services
    │   │   ├── 📄 authService.ts
    │   │   ├── 📄 couponService.ts
    │   │   ├── 📄 notificationService.ts
    │   │   ├── 📄 order.service.ts
    │   │   ├── 📄 statisticsService.ts
    │   │   └── 📄 user.service.ts
    │   └── 📁 types
    │       ├── 📄 order.ts
    │       └── 📄 user.ts
    ├── ⚙️ .gitignore
    ├── 📝 README.md
    ├── ⚙️ components.json
    ├── 📄 eslint.config.mjs
    ├── 📄 next-env.d.ts
    ├── 📄 next.config.ts
    ├── ⚙️ package-lock.json
    ├── ⚙️ package.json
    ├── 📄 postcss.config.js
    ├── 📄 tailwind.config.js
    └── ⚙️ tsconfig.json
```

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone <projectRepo>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   cd frontend -> npm run dev
   ```

4. Visit `http://localhost:4000` to see the app.
