/*
 Client page to allow `useTranslations` hook from next-intl
*/
import { redirect } from 'next/navigation'
import { routing } from '@/i18n/routing'

export default function LessonPlanRedirect() {
  // Redirect to the localized route (e.g. /vi/lesson-plan)
  redirect(`/${routing.defaultLocale}/lesson-plan`)
}
