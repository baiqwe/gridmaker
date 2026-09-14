# AdSense implementation and remaining release checks

Updated 2026-09-14: the owner supplied ca-pub-2499950673294937.
It is now the default public ID used by the production AdSense script,
verification metadata, and ads.txt. A valid build-time override is supported.
The code now includes the requested script; account approval, Auto ads settings,
CMP publication and consent behavior have not been verified in the account.

Follow-up on 2026-09-14: checked the signed-in AdSense UI. The European
regulations message specifically assigned to anygridmaker.com is Published,
with English and 31 additional languages. No settings were changed. Regional
accept/reject/withdrawal behavior still requires live verification after release.
The site detail currently shows Needs review and the ownership verification
step is still incomplete. Do not treat the published CMP as site approval.

The owner-provided support@anygridmaker.com address is now linked from Contact,
About and Privacy. Privacy copy explains that email messages/attachments are
received by support, unlike locally processed images. Mail delivery was not tested.

## Implemented

- A single strictly validated build-time VITE_GOOGLE_ADSENSE_CLIENT supplies
  both google-adsense-account metadata and ads.txt. It must match ca-pub- plus
  exactly 16 digits. Rebuild after setting it; adding only a runtime secret
  will not configure this implementation.
- Invalid publisher ID override: no verification metadata, ads.txt returns 404.
  This accurately signals absence rather than returning a placeholder seller list.
- A configured ID enables verification and loads the requested AdSense script
  in production. Ad serving also depends on Google account/site settings.
- Five-language tool labels, upload errors, export errors and share headings.
- Mobile controls no longer float over the page content.
- Removed repeated crochet keyword filler; added measured-gauge calculation,
  edge-cell decisions, C2C limitations and working-copy guidance.

## Required before advertising

1. Verify the deployed metadata, script client and ads.txt match the supplied
   publisher ID. This is not yet an assertion of deployment or Google authorization.
2. Complete ownership verification using the metadata option offered by AdSense.
   Confirm the actual site review status in the account.
3. Publish and test an appropriate certified CMP, including rejection and
   withdrawal. Verify GA and ad requests follow the selected consent model.
   This patch does not implement a CMP or claim that current analytics is compliant.
4. Configure explicit page/placement exclusions in AdSense and test on mobile.
   Exclude legal pages, errors and areas around upload/download controls.
5. Provide a real private support channel and maintainer details. None invented.
6. Add original tool-generated before/after examples with documented asset rights;
   verify the export files rather than presenting hypothetical results as tested.

These changes do not establish account eligibility or guarantee AdSense approval.
