$files = @(
  @{ path = "backend/package.json"; msg = "feat(backend): add package.json dependency configuration" },
  @{ path = "backend/prisma/schema.prisma"; msg = "feat(backend): add Prisma database schema for Supabase" },
  @{ path = "backend/prisma/seed.ts"; msg = "feat(backend): add database seed script for initial stream data" },
  @{ path = "backend/src/config/env.ts"; msg = "feat(backend): implement environment configuration loader" },
  @{ path = "backend/src/config/database.ts"; msg = "feat(backend): implement Prisma database client connection" },
  @{ path = "backend/src/providers/ai/openai.provider.ts"; msg = "feat(backend): implement OpenAI GPT-4o Vision AI provider" },
  @{ path = "backend/src/providers/storage/cloudinary.provider.ts"; msg = "feat(backend): implement Cloudinary storage provider" },
  @{ path = "backend/src/services/site.service.ts"; msg = "feat(backend): implement SiteService for stream location telemetry" },
  @{ path = "backend/src/services/observation.service.ts"; msg = "feat(backend): implement ObservationService for citizen reports" },
  @{ path = "backend/src/services/review.service.ts"; msg = "feat(backend): implement ReviewService for expert review queue" },
  @{ path = "backend/src/controllers/map.controller.ts"; msg = "feat(backend): implement MapController API endpoints" },
  @{ path = "backend/src/controllers/observation.controller.ts"; msg = "feat(backend): implement ObservationController API endpoints" },
  @{ path = "backend/src/controllers/site.controller.ts"; msg = "feat(backend): implement SiteController API endpoints" },
  @{ path = "backend/src/controllers/review.controller.ts"; msg = "feat(backend): implement ReviewController API endpoints" },
  @{ path = "backend/src/routes/map.routes.ts"; msg = "feat(backend): add map API routing" },
  @{ path = "backend/src/routes/observation.routes.ts"; msg = "feat(backend): add observation API routing" },
  @{ path = "backend/src/routes/site.routes.ts"; msg = "feat(backend): add site API routing" },
  @{ path = "backend/src/routes/review.routes.ts"; msg = "feat(backend): add review API routing" },
  @{ path = "backend/src/server.ts"; msg = "feat(backend): implement Express server entry point" },
  @{ path = "frontend/package.json"; msg = "feat(frontend): add Next.js 14 package.json dependencies" },
  @{ path = "frontend/next.config.mjs"; msg = "feat(frontend): add Next.js configuration and image domains" },
  @{ path = "frontend/tailwind.config.js"; msg = "feat(frontend): add Tailwind design system tokens" },
  @{ path = "frontend/src/app/globals.css"; msg = "feat(frontend): add global CSS styles and color tokens" },
  @{ path = "frontend/src/app/layout.tsx"; msg = "feat(frontend): implement root layout wrapper" },
  @{ path = "frontend/src/app/page.tsx"; msg = "feat(frontend): implement homepage landing page" },
  @{ path = "frontend/src/components/ui/Button.tsx"; msg = "feat(frontend): implement Button UI component" },
  @{ path = "frontend/src/components/ui/StatusBadge.tsx"; msg = "feat(frontend): implement StatusBadge UI component" },
  @{ path = "frontend/src/components/ui/ConfidenceIndicator.tsx"; msg = "feat(frontend): implement ConfidenceIndicator UI component" },
  @{ path = "frontend/src/components/ui/OneHealthCard.tsx"; msg = "feat(frontend): implement 4-Quadrant OneHealthCard component" },
  @{ path = "frontend/src/components/ui/PrintableInspectionReport.tsx"; msg = "feat(frontend): implement PrintableInspectionReport component" },
  @{ path = "frontend/src/components/ui/StreamAnomalyBanner.tsx"; msg = "feat(frontend): implement StreamAnomalyBanner alert component" },
  @{ path = "frontend/src/components/auth/AuthModal.tsx"; msg = "feat(frontend): implement AuthModal login and signup component" },
  @{ path = "frontend/src/components/layout/Header.tsx"; msg = "feat(frontend): implement navigation Header component" },
  @{ path = "frontend/src/components/layout/Footer.tsx"; msg = "feat(frontend): implement enterprise Footer component" },
  @{ path = "frontend/src/components/map/StreamMap.tsx"; msg = "feat(frontend): implement Leaflet Spatial Intelligence Map component" },
  @{ path = "frontend/src/app/observe/page.tsx"; msg = "feat(frontend): implement Citizen Observation Form page" },
  @{ path = "frontend/src/app/review/page.tsx"; msg = "feat(frontend): implement Expert Review Queue page" },
  @{ path = "frontend/src/app/map/page.tsx"; msg = "feat(frontend): implement Stream Intelligence Map page" },
  @{ path = "frontend/src/app/architecture/page.tsx"; msg = "feat(frontend): implement Architecture & One Health page" },
  @{ path = "frontend/src/app/observations/[id]/page.tsx"; msg = "feat(frontend): implement Observation Detail page" },
  @{ path = "frontend/src/app/sites/[id]/page.tsx"; msg = "feat(frontend): implement Site Telemetry & Trends page" }
)

foreach ($item in $files) {
  if (Test-Path $item.path) {
    Write-Host "Adding and committing: $($item.path)"
    git add $item.path
    git commit -m $item.msg
    git push origin main
  }
}

# Commit remaining supporting configuration/type files
git add .
if ((git status --porcelain).Length -gt 0) {
  git commit -m "feat: add supporting project configuration and types"
  git push origin main
}
