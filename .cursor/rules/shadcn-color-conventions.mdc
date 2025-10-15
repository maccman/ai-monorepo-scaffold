---
description: Guidelines for using shadcn semantic color system instead of hardcoded Tailwind colors whenever you are working with UI components / tsx files
---

# Shadcn Color Conventions

When working with UI components, always use shadcn's semantic color system instead of hardcoded Tailwind colors like `text-gray-900`, `text-red-600`, etc.

## Color Mappings

### Text Colors

- **`text-gray-900`** → **`text-foreground`** (primary text)
- **`text-gray-600/500/400`** → **`text-muted-foreground`** (secondary/muted text)
- **`text-red-600`** → **`text-destructive`** (error text)
- **`text-blue-600/800`** → **`text-primary`** with **`text-primary/80`** for hover states (links and primary actions)

### Status/State Colors

For status indicators and icons:

- **Success/Complete states** → `text-chart-1` (green equivalent)
- **Primary/Important actions** → `text-primary`
- **Warning/Pending states** → `text-chart-4` (yellow equivalent)
- **Error/Failed states** → `text-destructive`
- **Neutral/Inactive states** → `text-muted-foreground`

## Examples

### Before (Hardcoded Colors)

```tsx
// ❌ Don't use hardcoded colors
<h1 className="text-gray-900">Admin Dashboard</h1>
<p className="text-gray-600">Manage websites</p>
<span className="text-red-600">Error message</span>
<a className="text-blue-600 hover:text-blue-800">View Details</a>
<CheckCircle className="text-green-600" />
```

### After (Semantic Colors)

```tsx
// ✅ Use semantic color tokens
<h1 className="text-foreground">Admin Dashboard</h1>
<p className="text-muted-foreground">Manage websites</p>
<span className="text-destructive">Error message</span>
<a className="text-primary hover:text-primary/80">View Details</a>
<CheckCircle className="text-chart-1" />
```

## Benefits

1. **Theme Support**: Colors automatically adapt to dark/light modes
2. **Consistency**: Uses the same color system as shadcn components
3. **Maintainability**: Semantic names are more readable and meaningful
4. **Future-proof**: Changes to CSS variables automatically apply everywhere

## Reference

The color system is defined in [global.css](mdc:apps/web/src/styles/global.css) with CSS custom properties that work with both light and dark themes.
