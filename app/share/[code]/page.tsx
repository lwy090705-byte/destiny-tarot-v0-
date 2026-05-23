import { ShareInviteView } from "../share-invite-view"

type PageProps = {
  params: Promise<{ code: string }>
}

export default async function ShareWithCodePage({ params }: PageProps) {
  const { code } = await params
  const pathReferralSegment = decodeURIComponent(code)
  return <ShareInviteView pathReferralSegment={pathReferralSegment} />
}
