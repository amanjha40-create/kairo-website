import { siteUrl } from "@/lib/domain-config";

export type HelpAudience = "candidate" | "hr" | "institution" | "security" | "troubleshooting";

export type HelpSection =
  | "candidate"
  | "hr"
  | "institution"
  | "account-security"
  | "troubleshooting"
  | "contact-support";

export type HelpProblem = {
  title: string;
  detail: string;
};

export type HelpArticle = {
  slug: string;
  title: string;
  summary: string;
  audience: HelpAudience[];
  section: HelpSection;
  category: string;
  readMinutes: number;
  keywords: string[];
  whoItsFor: string;
  whatThisMeans: string;
  steps: string[];
  whatHappensNext: string[];
  commonProblems: HelpProblem[];
  related: string[];
};

export type HelpSectionMeta = {
  id: HelpSection;
  title: string;
  summary: string;
  audience: HelpAudience[];
};

export const helpSections: HelpSectionMeta[] = [
  {
    id: "candidate",
    title: "Candidate",
    summary: "Account setup, verification, Trust Passport sharing, resume import, and invitations.",
    audience: ["candidate"],
  },
  {
    id: "hr",
    title: "HR / Employers",
    summary: "People, Trust Invitations, employment verification workflows, and team setup.",
    audience: ["hr"],
  },
  {
    id: "institution",
    title: "Institution / Universities",
    summary: "Education verification requests, public magic links, responses, and evidence review.",
    audience: ["institution"],
  },
  {
    id: "account-security",
    title: "Account & Security",
    summary: "Password reset, OTP delivery, account access concerns, and suspicious access.",
    audience: ["candidate", "hr", "institution", "security"],
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    summary: "Common failure states across invitations, verification, uploads, shares, and login.",
    audience: ["candidate", "hr", "institution", "troubleshooting"],
  },
  {
    id: "contact-support",
    title: "Contact Support",
    summary: "Call, email, and submit a support request to the KairoID team.",
    audience: ["candidate", "hr", "institution", "security"],
  },
];

export const helpArticles: HelpArticle[] = [
  {
    slug: "candidate-getting-started",
    title: "Create your KairoID account and finish onboarding",
    summary: "What KairoID is, how signup works, and what to expect during candidate onboarding.",
    audience: ["candidate"],
    section: "candidate",
    category: "Getting started",
    readMinutes: 4,
    keywords: ["kairo", "create account", "signup", "login", "onboarding", "getting started"],
    whoItsFor: "Candidates using KairoID for the first time.",
    whatThisMeans:
      "KairoID helps you build a Trust Passport from verified professional information. Your onboarding flow collects your account details and prepares you for verification, sharing, and future invitations.",
    steps: [
      "Create your account with your email address and complete phone verification when requested.",
      "Verify your email if the app asks you to confirm your inbox before continuing.",
      "Finish the guided onboarding steps so KairoID can personalize your candidate experience.",
      "Add your first career or education record when you are ready to start building your Trust Passport.",
    ],
    whatHappensNext: [
      "You will land in the candidate app and can continue with career records, verification, and passport sharing.",
      "Some actions, such as accepting a Trust Invitation, may send you directly into the relevant next step.",
    ],
    commonProblems: [
      {
        title: "I did not receive the email or phone code",
        detail:
          "Use the OTP and account recovery articles in Account & Security before retrying signup repeatedly.",
      },
      {
        title: "The app asks me to log in before I can continue",
        detail:
          "Your session may have expired or you may have opened a first-touch link without an active session.",
      },
    ],
    related: [
      "candidate-email-phone-verification",
      "candidate-password-reset",
      "trust-invitation-basics",
    ],
  },
  {
    slug: "candidate-email-phone-verification",
    title: "Verify your email address and phone number",
    summary:
      "How KairoID email and phone verification works, including what to check if the OTP does not arrive.",
    audience: ["candidate", "security"],
    section: "candidate",
    category: "Getting started",
    readMinutes: 3,
    keywords: [
      "email verification",
      "phone verification",
      "otp",
      "code",
      "verification code",
      "not received",
    ],
    whoItsFor: "Candidates who are confirming their contact details.",
    whatThisMeans:
      "KairoID uses verified contact details to secure your account and support important actions like password reset and OTP login challenges.",
    steps: [
      "Enter the email address or phone number requested by KairoID.",
      "Wait for the verification message to arrive and enter the code exactly as shown.",
      "If a code expires, request a new code instead of reusing the old one.",
      "Once verified, continue onboarding or return to the screen that asked for the check.",
    ],
    whatHappensNext: [
      "KairoID stores only the verified contact route needed for future account-security flows.",
      "You may be asked to verify again if you change your contact details later.",
    ],
    commonProblems: [
      {
        title: "OTP not received",
        detail:
          "Check network coverage, wait briefly for propagation, and use the dedicated OTP troubleshooting article if needed.",
      },
      {
        title: "Wrong contact detail",
        detail: "Go back and correct the email or phone number before requesting another code.",
      },
    ],
    related: ["otp-not-received", "candidate-password-reset", "account-access-security"],
  },
  {
    slug: "candidate-password-reset",
    title: "Reset your password safely",
    summary:
      "How to request a password reset, use the reset link, and recover access without sharing secrets.",
    audience: ["candidate", "security"],
    section: "candidate",
    category: "Account",
    readMinutes: 3,
    keywords: ["forgot password", "reset password", "reset link", "login failed", "password help"],
    whoItsFor: "Candidates who cannot sign in or need to reset their password.",
    whatThisMeans:
      "Password reset is the safe recovery path when you still control your email or phone route. KairoID support should never ask you to send your password or OTP.",
    steps: [
      "Use the Forgot password flow from the login page.",
      "Open the reset email or paste the reset token into the reset page if needed.",
      "Choose a strong new password and confirm it once.",
      "Log in again with the new password after the reset succeeds.",
    ],
    whatHappensNext: [
      "Older reset links should no longer be reused after a successful password change.",
      "If the link is invalid or expired, request a fresh one instead of retrying the old token.",
    ],
    commonProblems: [
      {
        title: "Reset link is invalid",
        detail: "Use the newest reset email and make sure the full link or token was copied.",
      },
      {
        title: "I no longer control the email account",
        detail:
          "Use the account-access concern route instead of asking support to change ownership blindly.",
      },
    ],
    related: ["login-reset-troubleshooting", "lost-work-email-access", "account-access-security"],
  },
  {
    slug: "candidate-career-records",
    title: "Add and edit your career records",
    summary:
      "How to manage employment, education, internship, freelance, certification, and portfolio records.",
    audience: ["candidate"],
    section: "candidate",
    category: "Career",
    readMinutes: 5,
    keywords: [
      "employment",
      "education",
      "internship",
      "freelance",
      "certifications",
      "portfolio",
      "edit record",
    ],
    whoItsFor: "Candidates building or updating their Trust Passport.",
    whatThisMeans:
      "Your career records are the foundation for later verification. Keep them accurate before you submit verification evidence or share a Trust Passport.",
    steps: [
      "Open the relevant career area in the candidate app and choose the record type you want to add.",
      "Fill in the core facts exactly as they were issued or held in the real-world record.",
      "Save your draft, then return later to add evidence or verification details when needed.",
      "If you need to correct an unverified record, edit the draft directly from the record detail screen.",
    ],
    whatHappensNext: [
      "Once verified, KairoID may protect parts of the record so trust-critical facts are not silently changed.",
      "If a verified fact needs correction, KairoID may require a formal correction cycle instead of a direct edit.",
    ],
    commonProblems: [
      {
        title: "I cannot edit a verified record",
        detail:
          "That is expected for trust-protected facts. Use the correction or support flow instead of creating a conflicting duplicate.",
      },
      {
        title: "I am unsure which record type to choose",
        detail:
          "Pick the closest supported type first. Certifications and portfolio items are usually better than hiding them inside employment notes.",
      },
    ],
    related: [
      "candidate-verification-basics",
      "candidate-resume-import",
      "candidate-trust-passport",
    ],
  },
  {
    slug: "candidate-resume-import",
    title: "Import a resume and review the parsed result",
    summary: "How resume upload, processing, parsing, and manual review work in KairoID.",
    audience: ["candidate", "troubleshooting"],
    section: "candidate",
    category: "Resume",
    readMinutes: 4,
    keywords: ["resume import", "upload resume", "processing", "parsed resume", "resume failed"],
    whoItsFor: "Candidates using resume upload to speed up profile setup.",
    whatThisMeans:
      "Resume import is a starting point, not a final source of truth. You still need to review the parsed data before relying on it for verification or sharing.",
    steps: [
      "Upload a supported resume file from the resume import screen.",
      "Wait while KairoID processes the file and extracts the likely records.",
      "Review the parsed result carefully before saving or using the imported facts.",
      "Correct anything that is incomplete or inaccurate before submitting for verification.",
    ],
    whatHappensNext: [
      "Imported facts remain editable until they become part of a protected verification flow.",
      "If parsing is incomplete, you can still continue manually without restarting your whole profile.",
    ],
    commonProblems: [
      {
        title: "The upload finished but the parsed data looks wrong",
        detail:
          "Review and edit the result manually. Resume parsing should never be treated as verified evidence by itself.",
      },
      {
        title: "Upload failed or is stuck",
        detail:
          "Use the dedicated resume upload troubleshooting article and retry with a clean PDF if needed.",
      },
    ],
    related: [
      "resume-upload-troubleshooting",
      "candidate-career-records",
      "candidate-verification-basics",
    ],
  },
  {
    slug: "candidate-verification-basics",
    title: "Submit a record for verification and understand the statuses",
    summary:
      "What verification means, which evidence to upload, and how to read the status changes in KairoID.",
    audience: ["candidate"],
    section: "candidate",
    category: "Verification",
    readMinutes: 6,
    keywords: [
      "verification",
      "submit evidence",
      "pending review",
      "in progress",
      "corrections requested",
      "verified",
      "rejected",
    ],
    whoItsFor: "Candidates preparing employment or education records for KairoID verification.",
    whatThisMeans:
      "Verification is how KairoID turns a self-entered fact into a trusted one. Status changes tell you where the request is in review, outreach, or correction.",
    steps: [
      "Open the relevant record and start the verification flow.",
      "Upload the evidence or verification contact details KairoID requests for that record type.",
      "Submit the request and monitor its timeline in the Verify area.",
      "If KairoID asks for corrections, update only the requested parts and resubmit the record.",
    ],
    whatHappensNext: [
      "A request may move through pending KairoID review, in progress, correction requested, unable to verify, rejected, or verified depending on the evidence and source response.",
      "Verified facts can later appear inside your Trust Passport and may be shareable with your consent.",
    ],
    commonProblems: [
      {
        title: "Verification is still pending",
        detail:
          "Some requests wait on KairoID review or the external source. Use the verification-pending article if the state looks stale.",
      },
      {
        title: "KairoID requested corrections",
        detail:
          "Do not create a new verification request unless KairoID explicitly tells you to. Update the requested evidence or contact and resubmit.",
      },
    ],
    related: [
      "verification-pending-troubleshooting",
      "candidate-evidence-help",
      "candidate-trust-passport",
    ],
  },
  {
    slug: "candidate-evidence-help",
    title: "Choose the right evidence for verification",
    summary:
      "What to upload, how KairoID uses the files, and what happens when an evidence upload fails.",
    audience: ["candidate", "troubleshooting"],
    section: "candidate",
    category: "Verification",
    readMinutes: 4,
    keywords: [
      "evidence",
      "upload document",
      "what should I upload",
      "verification documents",
      "proof",
    ],
    whoItsFor: "Candidates who need to attach supporting documents to a verification request.",
    whatThisMeans:
      "Evidence helps KairoID review a claim, but it does not automatically replace source verification. Upload only the files relevant to the exact record you are verifying.",
    steps: [
      "Check the record type and only upload documents directly connected to that claim.",
      "Use clear, complete files rather than cropped screenshots where possible.",
      "Wait for the file to finish uploading before leaving the screen.",
      "Return to the verification status page to confirm the evidence is attached.",
    ],
    whatHappensNext: [
      "KairoID may review the file, ask for corrections, or move the request deeper into source verification.",
      "Evidence that is incomplete or unreadable may slow the request or trigger a correction cycle.",
    ],
    commonProblems: [
      {
        title: "Evidence upload failed",
        detail: "Try a smaller clean PDF or image, then retry the upload from a stable connection.",
      },
      {
        title: "I am worried about how my file will be used",
        detail:
          "KairoID should only use the file for the related verification workflow. Do not upload unrelated sensitive material.",
      },
    ],
    related: [
      "resume-upload-troubleshooting",
      "candidate-verification-basics",
      "account-access-security",
    ],
  },
  {
    slug: "trust-invitation-basics",
    title: "Understand and accept a Trust Invitation",
    summary:
      "Why you received a Trust Invitation, what happens when you accept it, and what to do if the link is unavailable.",
    audience: ["candidate", "hr", "troubleshooting"],
    section: "candidate",
    category: "Trust Invitations",
    readMinutes: 4,
    keywords: [
      "trust invitation",
      "why did I receive this",
      "accept invitation",
      "invite unavailable",
      "candidate invitation",
    ],
    whoItsFor:
      "Candidates who were invited by an organization to verify or share trust-related information.",
    whatThisMeans:
      "A Trust Invitation is a secure request from an organization asking you to participate in a KairoID trust workflow. Accepting it may create or continue a verification process tied to your account.",
    steps: [
      "Open the secure invitation link and review the requesting organization, purpose, and requested checks.",
      "Log in with the correct KairoID candidate account or create one if you do not have access yet.",
      "Accept the invitation only after confirming the request matches your real relationship with that organization.",
      "Continue into the Verify area or other requested next step after acceptance succeeds.",
    ],
    whatHappensNext: [
      "The inviting organization will see that you responded according to the product workflow.",
      "You may need to upload evidence, update information, or simply monitor the verification state afterward.",
    ],
    commonProblems: [
      {
        title: "The invitation says unavailable",
        detail:
          "The link may be invalid, expired, cancelled, or already used. Use the unavailable article for the safest next step.",
      },
      {
        title: "I am not sure why I received this",
        detail:
          "Check the organization name and request purpose before accepting. If it looks wrong, use KairoID support instead of proceeding.",
      },
    ],
    related: [
      "trust-invitation-unavailable",
      "candidate-getting-started",
      "account-access-security",
    ],
  },
  {
    slug: "trust-invitation-unavailable",
    title: "Fix an unavailable, expired, or already-used Trust Invitation",
    summary: "What to do when a Trust Invitation cannot be opened or accepted.",
    audience: ["candidate", "hr", "troubleshooting"],
    section: "troubleshooting",
    category: "Trust Invitations",
    readMinutes: 3,
    keywords: [
      "invitation unavailable",
      "invite expired",
      "already accepted invitation",
      "candidate did not receive invite",
    ],
    whoItsFor: "Candidates and HR teams troubleshooting first-touch invitation problems.",
    whatThisMeans:
      "Unavailable usually means the secure invitation can no longer be used exactly as opened. The right recovery path depends on whether the issue is expiry, cancellation, delivery, or account mismatch.",
    steps: [
      "Confirm you opened the full secure link and not a truncated copy.",
      "Check whether you are logged in with the correct candidate account for the invitation.",
      "If the invitation has expired or was cancelled, ask the requesting organization for the correct next step instead of trying to reuse the old link.",
      "If the email never arrived, check delivery and the organization's resend status before creating a brand-new workflow.",
    ],
    whatHappensNext: [
      "KairoID or the inviting organization may resend the invitation if the workflow still supports it.",
      "If the invitation was already accepted, you should usually continue from the resulting verification or workflow state instead of reopening the same link.",
    ],
    commonProblems: [
      {
        title: "Wrong account was used",
        detail:
          "Log out and reopen the link with the correct candidate identity instead of creating a duplicate account blindly.",
      },
      {
        title: "HR says the invite was sent but nothing arrived",
        detail:
          "Check the HR delivery status first. Delivery failures should be resolved before repeated resends.",
      },
    ],
    related: ["trust-invitation-basics", "hr-trust-invitations", "candidate-password-reset"],
  },
  {
    slug: "candidate-trust-passport",
    title: "Use and share your Trust Passport",
    summary:
      "What a Trust Passport is, how verified and unverified information appears, and how sharing and revocation work.",
    audience: ["candidate", "hr"],
    section: "candidate",
    category: "Trust Passport",
    readMinutes: 5,
    keywords: [
      "trust passport",
      "share passport",
      "revoke share",
      "public passport",
      "verified vs unverified",
      "trust score",
    ],
    whoItsFor: "Candidates managing their portable trust record and teams viewing it with consent.",
    whatThisMeans:
      "Your Trust Passport is the candidate-owned record that holds verified professional information and related share controls. Sharing is deliberate, time-bounded, and revocable.",
    steps: [
      "Open the Trust Passport area to review the current verified and unverified information.",
      "Create a share only when you want another organization or person to view it.",
      "Choose the share label or exposure options supported by the product before sending the link onward.",
      "Revoke the share later if you no longer want the public link to remain active.",
    ],
    whatHappensNext: [
      "A valid share can be opened by the recipient until it expires or is revoked.",
      "Revoked or expired shares should fail closed and stop exposing the public Trust Passport.",
    ],
    commonProblems: [
      {
        title: "The public share no longer opens",
        detail:
          "It may be expired, revoked, or unavailable. Create a fresh share only if you still want that viewer to have access.",
      },
      {
        title: "I expected a record to be verified already",
        detail:
          "Only completed verification outcomes should appear as verified. Draft or pending facts may still appear separately.",
      },
    ],
    related: [
      "passport-share-troubleshooting",
      "candidate-verification-basics",
      "hr-people-and-passports",
    ],
  },
  {
    slug: "candidate-notifications",
    title: "Understand KairoID notifications and missing targets",
    summary:
      "What notification states mean and what to do if a notification opens a stale or missing target.",
    audience: ["candidate", "troubleshooting"],
    section: "candidate",
    category: "Notifications",
    readMinutes: 3,
    keywords: ["notifications", "missing target", "stale notification", "open notification"],
    whoItsFor:
      "Candidates following activity across verification, invitations, and Trust Passport changes.",
    whatThisMeans:
      "Notifications help you return to the workflow that changed, but some targets may no longer be valid if the underlying item expired, was completed, or was removed.",
    steps: [
      "Open the notification and read the summary first before acting on it.",
      "If it opens a live record, continue from that screen instead of duplicating the action manually.",
      "If the target is missing, check the related workflow area such as Verify or Trust Passport.",
      "Use support if the notification history suggests a mismatch with the visible product state.",
    ],
    whatHappensNext: [
      "Newer notifications should reflect the current workflow state more clearly than stale older ones.",
      "A missing target often means the status changed faster than the old deep link could remain useful.",
    ],
    commonProblems: [
      {
        title: "Notification opens nothing useful",
        detail:
          "Use the broader workflow screen, then search by the record or request instead of trusting the stale deep link alone.",
      },
      {
        title: "I missed an important verification change",
        detail:
          "Check the Verify timeline directly. Notifications are helpful, but they should not replace the source-of-truth status screen.",
      },
    ],
    related: ["candidate-verification-basics", "candidate-trust-passport", "contact-support"],
  },
  {
    slug: "hr-getting-started",
    title: "Set up your HR Workspace and first organization flow",
    summary: "How HR Workspace login, organization onboarding, and first-use setup work.",
    audience: ["hr"],
    section: "hr",
    category: "Getting started",
    readMinutes: 4,
    keywords: [
      "hr workspace",
      "employer onboarding",
      "login",
      "organization setup",
      "employer help",
    ],
    whoItsFor: "HR and employer users onboarding into KairoID.",
    whatThisMeans:
      "The HR Workspace is where your organization manages Trust Invitations, people, verification requests, and team access. Early setup should stay clean so delivery and verification workflows remain trustworthy.",
    steps: [
      "Log in with the correct organization-linked HR account.",
      "Review your workspace settings and confirm the organization identity shown by KairoID.",
      "Invite or add the right team members before launching live workflows.",
      "Send your first controlled invitation or review your first inbound verification from the workspace.",
    ],
    whatHappensNext: [
      "Your workspace becomes the source of truth for people, delivery, and verification states tied to that organization.",
      "If onboarding is incomplete, use KairoID onboarding help rather than improvising production behavior.",
    ],
    commonProblems: [
      {
        title: "I seem to be in the wrong organization",
        detail:
          "Treat this as an access concern, not a normal UI issue. Use the security/contact path instead of continuing.",
      },
      {
        title: "A team member cannot see the workspace",
        detail:
          "Check their role, identity, and invitation status before assuming the whole organization is broken.",
      },
    ],
    related: ["hr-people-and-passports", "hr-team-permissions", "account-access-security"],
  },
  {
    slug: "hr-people-and-passports",
    title: "Use People, person status, and shared Trust Passport state",
    summary:
      "How to read person status, future employee states, verification status, and passport sharing visibility.",
    audience: ["hr"],
    section: "hr",
    category: "People",
    readMinutes: 4,
    keywords: [
      "people list",
      "person status",
      "future employee",
      "passport sharing",
      "shared passport",
    ],
    whoItsFor: "HR users reviewing candidate and verification-related people records.",
    whatThisMeans:
      "The People area helps your team understand whether the candidate has responded, shared a Trust Passport, or progressed into verification. It should be read together with invitation and verification status instead of in isolation.",
    steps: [
      "Open the person record and review the current status and related activity.",
      "Check whether the candidate has shared a Trust Passport and whether that share is still active.",
      "Use the linked invitation or verification detail if you need more workflow context.",
      "Record internal notes only where the workspace explicitly supports them.",
    ],
    whatHappensNext: [
      "Shared Trust Passport access may expire or be revoked by the candidate later.",
      "Status changes in People usually reflect upstream invitation or verification activity.",
    ],
    commonProblems: [
      {
        title: "The candidate accepted but I do not see verification yet",
        detail:
          "Check whether the accepted step should create a verification immediately or just prepare the next workflow stage.",
      },
      {
        title: "Passport access is missing",
        detail: "The share may not have been created yet, or it may be expired or revoked.",
      },
    ],
    related: [
      "hr-trust-invitations",
      "candidate-trust-passport",
      "verification-pending-troubleshooting",
    ],
  },
  {
    slug: "hr-trust-invitations",
    title: "Create, send, and track Trust Invitations from HR Workspace",
    summary:
      "How Trust Invitations work for HR, including delivery status, expiry, and what to do when a candidate cannot open the invite.",
    audience: ["hr", "candidate", "troubleshooting"],
    section: "hr",
    category: "Trust Invitations",
    readMinutes: 5,
    keywords: [
      "send invitation",
      "delivery status",
      "resend",
      "cancel invitation",
      "candidate did not receive invite",
    ],
    whoItsFor: "HR teams sending Trust Invitations to candidates.",
    whatThisMeans:
      "Trust Invitations are the controlled way to request candidate participation in KairoID trust workflows. Delivery state and invitation state both matter, and they are not the same thing.",
    steps: [
      "Create the invitation with the correct candidate identity and requested data scope.",
      "Review the purpose, expiry, and destination before sending.",
      "Track both invitation state and delivery state after dispatch.",
      "If the candidate reports a problem, inspect the invitation record before resending or replacing it.",
    ],
    whatHappensNext: [
      "Candidates may accept, ignore, or fail to receive the invitation depending on the downstream delivery and account state.",
      "Your workspace should keep the historical invitation record even when the candidate later progresses elsewhere.",
    ],
    commonProblems: [
      {
        title: "Delivery says queued or failed",
        detail:
          "Resolve delivery first. Repeated resends do not help if the channel configuration itself is broken.",
      },
      {
        title: "Candidate says invite unavailable",
        detail:
          "Check expiry, cancellation, and whether the candidate used the correct account before creating another invitation.",
      },
    ],
    related: [
      "trust-invitation-unavailable",
      "candidate-did-not-receive-invitation",
      "hr-getting-started",
    ],
  },
  {
    slug: "candidate-did-not-receive-invitation",
    title: "Candidate did not receive the Trust Invitation email",
    summary:
      "A troubleshooting checklist for HR teams when the candidate says the invitation never arrived.",
    audience: ["hr", "troubleshooting"],
    section: "troubleshooting",
    category: "HR troubleshooting",
    readMinutes: 3,
    keywords: [
      "invite not received",
      "candidate email missing",
      "delivery failed",
      "resend invitation",
    ],
    whoItsFor: "HR teams debugging first-touch invitation delivery.",
    whatThisMeans:
      "If the candidate never received the email, the delivery path should be inspected before you assume the candidate ignored the request.",
    steps: [
      "Check the invitation delivery status in HR Workspace first.",
      "Verify the candidate email address was entered correctly in the invitation flow.",
      "If delivery failed or bounced, correct the address or route before retrying.",
      "Only resend when the delivery path looks healthy and the invitation is still the right workflow to reuse.",
    ],
    whatHappensNext: [
      "A truthful delivery state helps your team decide whether to resend, cancel, or contact the candidate directly.",
      "If the candidate later receives a stale message, the secure link may still fail closed if the invitation is no longer valid.",
    ],
    commonProblems: [
      {
        title: "Delivery shows delivered but the candidate still cannot find it",
        detail:
          "Ask them to search the exact mailbox and then test whether the link is still valid before reissuing.",
      },
      {
        title: "We resent repeatedly and made it worse",
        detail:
          "Pause and inspect the latest invitation state. Blind resend loops make debugging harder.",
      },
    ],
    related: ["hr-trust-invitations", "trust-invitation-unavailable", "contact-support"],
  },
  {
    slug: "hr-employment-verification",
    title: "Review and respond to employment verification requests",
    summary:
      "What inbound employment verification means, how to confirm or correct information, and how status progression works.",
    audience: ["hr"],
    section: "hr",
    category: "Employment verifications",
    readMinutes: 5,
    keywords: [
      "employment verification",
      "confirm information",
      "deny",
      "correction",
      "verification request",
    ],
    whoItsFor: "HR users responding to employment verification workflows.",
    whatThisMeans:
      "An employment verification request asks your organization to confirm facts that matter to trust. Your response should be truthful, source-based, and limited to the fields KairoID requests.",
    steps: [
      "Open the verification request and review the candidate claim and requested fields.",
      "Confirm only what your organization can truthfully verify from source records.",
      "Use the correction or discrepancy path if the submitted claim does not match your records.",
      "Submit the response once and confirm the status changed as expected.",
    ],
    whatHappensNext: [
      "KairoID records the response and advances the verification workflow for the candidate.",
      "Some workflows may still continue into KairoID review before they become fully verified.",
    ],
    commonProblems: [
      {
        title: "I cannot see the verification request",
        detail:
          "Check whether you are in the correct workspace, role, and route before assuming the request was lost.",
      },
      {
        title: "The candidate already changed jobs",
        detail:
          "Respond only to the factual period or role your organization can verify from records.",
      },
    ],
    related: [
      "hr-people-and-passports",
      "hr-team-permissions",
      "verification-pending-troubleshooting",
    ],
  },
  {
    slug: "hr-team-permissions",
    title: "Manage HR team roles and permissions",
    summary:
      "How to add team members, change access, and remove access without breaking your organization workflow.",
    audience: ["hr", "security"],
    section: "hr",
    category: "Team",
    readMinutes: 4,
    keywords: [
      "team",
      "permissions",
      "roles",
      "add team member",
      "remove access",
      "workspace access",
    ],
    whoItsFor: "HR organizations managing multiple KairoID users.",
    whatThisMeans:
      "Team access should be deliberate. The wrong role can block verification work or expose the wrong organization state to the wrong person.",
    steps: [
      "Invite the correct teammate into the correct workspace.",
      "Assign only the role needed for their real work.",
      "Review access whenever responsibilities change or a person leaves the organization.",
      "Remove stale access promptly instead of leaving old accounts attached indefinitely.",
    ],
    whatHappensNext: [
      "Permission changes should affect what the teammate can see or do in the workspace.",
      "If the wrong organization is visible, treat it as a security or access concern.",
    ],
    commonProblems: [
      {
        title: "Team member cannot access the workspace",
        detail:
          "Check the invite state, role assignment, and whether they are logging into the right product.",
      },
      {
        title: "A user can see the wrong organization",
        detail: "Stop normal workflow actions and use the account access concern route.",
      },
    ],
    related: ["hr-getting-started", "account-access-security", "contact-support"],
  },
  {
    slug: "institution-getting-started",
    title: "Set up your Institution Workspace",
    summary:
      "How university or institution users log in, onboard, and prepare for education verification requests.",
    audience: ["institution"],
    section: "institution",
    category: "Getting started",
    readMinutes: 4,
    keywords: [
      "institution workspace",
      "university onboarding",
      "institution login",
      "education verification",
    ],
    whoItsFor:
      "Institution or university teams responding to KairoID education verification workflows.",
    whatThisMeans:
      "The Institution Workspace is where your team reviews education requests, evidence, and candidate claims without exposing data beyond the allowed contract.",
    steps: [
      "Log in with the correct institution-linked account.",
      "Confirm the institution identity and team access before using live requests.",
      "Review the incoming request views and public verification link behavior.",
      "Use onboarding help if your team is new to the KairoID workflow.",
    ],
    whatHappensNext: [
      "Your institution can respond to public or authenticated verification requests according to the current KairoID workflow.",
      "Incorrect access or mismatched organization context should be treated as an account-access concern.",
    ],
    commonProblems: [
      {
        title: "We are new and unsure how to respond",
        detail: "Use onboarding support instead of guessing in a live verification request.",
      },
      {
        title: "The wrong institution appears",
        detail:
          "Pause and report the access issue. Do not confirm or deny records from the wrong institution context.",
      },
    ],
    related: [
      "institution-public-magic-link",
      "institution-respond-to-request",
      "account-access-security",
    ],
  },
  {
    slug: "institution-public-magic-link",
    title: "Open a secure education verification email link",
    summary:
      "What the public institution verification link is, why you received it, and how to handle invalid, expired, or already-completed links.",
    audience: ["institution", "troubleshooting"],
    section: "institution",
    category: "Public magic link",
    readMinutes: 4,
    keywords: [
      "institution link",
      "magic link",
      "verify token",
      "expired link",
      "already completed",
    ],
    whoItsFor: "Institution users opening an email-based verification request.",
    whatThisMeans:
      "The public verification link is a secure one-off route into a specific education verification request. It should fail closed when the token is invalid, expired, revoked, or already completed.",
    steps: [
      "Open the full secure URL from the verification email.",
      "Review the requesting organization, candidate claim, and any permitted evidence.",
      "Choose the correct response path such as confirm, discrepancy, or clarification.",
      "Submit only one truthful response for that request.",
    ],
    whatHappensNext: [
      "The link may become terminal after a completed response depending on the workflow.",
      "If the request is no longer usable, KairoID should not leak extra information through the public route.",
    ],
    commonProblems: [
      {
        title: "The link says unavailable",
        detail:
          "Use the institution link troubleshooting article. The token may be invalid, expired, revoked, or already completed.",
      },
      {
        title: "I want more context before responding",
        detail:
          "Use the clarification path if the public workflow supports it, rather than guessing the record outcome.",
      },
    ],
    related: ["institution-link-unavailable", "institution-respond-to-request", "contact-support"],
  },
  {
    slug: "institution-respond-to-request",
    title: "Confirm, report a discrepancy, or request clarification",
    summary:
      "How institution users should respond to education verification requests and what happens after a response is submitted.",
    audience: ["institution"],
    section: "institution",
    category: "Responses",
    readMinutes: 5,
    keywords: [
      "confirm request",
      "report discrepancy",
      "request clarification",
      "education response",
      "what happens next",
    ],
    whoItsFor: "Institution users responding to candidate education claims.",
    whatThisMeans:
      "Your response becomes part of the candidate's trust workflow. It should reflect what the institution can actually confirm from source records.",
    steps: [
      "Review the candidate claim and any fields the request exposes for response.",
      "Confirm the record if it matches your source information.",
      "Use discrepancy if the record is wrong, or clarification if you need more detail before responding.",
      "Submit the response once and confirm the request moves to its next workflow state.",
    ],
    whatHappensNext: [
      "KairoID records the response and advances the downstream verification review.",
      "Duplicate submission attempts should not create multiple conflicting responses.",
    ],
    commonProblems: [
      {
        title: "Candidate data does not match records",
        detail:
          "Use discrepancy or clarification rather than forcing a confirmation just to close the task.",
      },
      {
        title: "The request already looks completed",
        detail:
          "Do not try to re-answer it. Completed public links should fail closed or show a truthful terminal state.",
      },
    ],
    related: [
      "institution-public-magic-link",
      "institution-link-unavailable",
      "institution-people-evidence",
    ],
  },
  {
    slug: "institution-people-evidence",
    title: "Review people, evidence, and timeline context in Institution Workspace",
    summary:
      "How to understand candidate claim context, permitted evidence, and the verification timeline.",
    audience: ["institution"],
    section: "institution",
    category: "People / Evidence / Timeline",
    readMinutes: 4,
    keywords: [
      "institution evidence",
      "timeline",
      "candidate claim",
      "people",
      "verification request details",
    ],
    whoItsFor: "Institution users reviewing request context around education verification.",
    whatThisMeans:
      "Institution workflows should expose only the evidence and timeline information that is allowed by KairoID's contract. You should not need a full candidate passport to answer the request truthfully.",
    steps: [
      "Review the candidate claim fields first.",
      "Open the permitted evidence items if the request includes them.",
      "Use the timeline or request history to understand what already happened before your response.",
      "Keep your response limited to the information the institution can legitimately confirm.",
    ],
    whatHappensNext: [
      "Supporting evidence may help explain why a clarification or discrepancy is needed.",
      "The timeline provides the safest context when multiple actions have already happened.",
    ],
    commonProblems: [
      {
        title: "Evidence is missing",
        detail:
          "If the workflow allows clarification, ask for what is needed instead of confirming from memory.",
      },
      {
        title: "The request looks different from prior ones",
        detail:
          "That may reflect a different public contract or request type. Stay within the visible request details.",
      },
    ],
    related: ["institution-respond-to-request", "institution-getting-started", "contact-support"],
  },
  {
    slug: "account-access-security",
    title: "Handle suspicious access or an account-security concern",
    summary:
      "What to do if you suspect unexpected access, wrong organization access, or possible information exposure.",
    audience: ["candidate", "hr", "institution", "security"],
    section: "account-security",
    category: "Security",
    readMinutes: 4,
    keywords: [
      "security",
      "suspicious login",
      "wrong organization",
      "account access",
      "data exposure",
      "urgent support",
    ],
    whoItsFor: "Any KairoID user with a potential security or account-access issue.",
    whatThisMeans:
      "Security and access concerns should not be treated like a normal FAQ. The fastest safe path is to stop risky actions, avoid sharing secrets, and contact KairoID through the dedicated support route.",
    steps: [
      "Stop using the affected session if you believe the account or organization context is wrong.",
      "Do not send your password, OTP, access token, refresh token, private key, or raw secure link to anyone.",
      "Use the Contact Support security path and include only safe identifiers such as a public invitation or verification ID if available.",
      "Change your password if you still control the account and the issue appears limited to your own login.",
    ],
    whatHappensNext: [
      "KairoID support can triage the access concern using the safe metadata you provide.",
      "Some cases may require organization-side access review before the normal workflow can resume.",
    ],
    commonProblems: [
      {
        title: "I can see the wrong organization",
        detail:
          "Treat that as urgent. Do not continue processing invitations or verification requests in that state.",
      },
      {
        title: "I lost the work email tied to my account",
        detail:
          "Use the lost-access article and support request route instead of asking someone else to impersonate the account.",
      },
    ],
    related: ["lost-work-email-access", "candidate-password-reset", "contact-support"],
  },
  {
    slug: "otp-not-received",
    title: "OTP not received",
    summary: "A practical checklist for phone and email OTP delivery problems.",
    audience: ["candidate", "security", "troubleshooting"],
    section: "account-security",
    category: "Security",
    readMinutes: 3,
    keywords: [
      "otp not received",
      "code not received",
      "phone otp",
      "email otp",
      "verification code failed",
    ],
    whoItsFor: "Users blocked on a one-time code for login, signup, or account recovery.",
    whatThisMeans:
      "OTP delays are usually caused by contact errors, delivery lag, or an expired request. Keep the recovery path clean and avoid repeated uncontrolled resends.",
    steps: [
      "Confirm the email address or phone number shown on screen is correct.",
      "Wait briefly for propagation before requesting another OTP.",
      "Use the newest OTP only. Older codes may already be expired or invalidated.",
      "If repeated attempts fail, contact KairoID support and share only safe context such as product and route.",
    ],
    whatHappensNext: [
      "A fresh OTP should replace the older one when a resend succeeds.",
      "If delivery remains broken, KairoID support can investigate the channel without needing your secret code.",
    ],
    commonProblems: [
      {
        title: "I received a shorter or older code",
        detail:
          "Use only the newest current OTP displayed for the current session. Do not mix old codes into a new flow.",
      },
      {
        title: "I want to send the OTP to support",
        detail:
          "Do not do that. KairoID should never need your OTP to diagnose the delivery problem.",
      },
    ],
    related: ["candidate-email-phone-verification", "candidate-password-reset", "contact-support"],
  },
  {
    slug: "lost-work-email-access",
    title: "Lost access to your work email or organization account",
    summary: "What to do when the login route you used before is no longer under your control.",
    audience: ["candidate", "hr", "institution", "security"],
    section: "account-security",
    category: "Security",
    readMinutes: 3,
    keywords: ["lost email", "work email access", "organization access", "cannot login"],
    whoItsFor: "Users who can no longer access the email account tied to KairoID.",
    whatThisMeans:
      "Loss of an organization email can affect password reset, onboarding, invitation receipt, and access review. This is an identity and access problem, not just a UI bug.",
    steps: [
      "Do not ask someone else to log in for you or forward sensitive links.",
      "Use the support request flow and choose the security or account access concern category.",
      "Provide safe identifying context such as your public user ID, organization ID, or route if you have them.",
      "Wait for KairoID to advise the correct recovery path before taking further action.",
    ],
    whatHappensNext: [
      "KairoID may need to verify ownership or organization context before changing access-related details.",
      "Normal password reset may not be sufficient if the trusted contact route itself is no longer yours.",
    ],
    commonProblems: [
      {
        title: "My old employer mailbox was deactivated",
        detail:
          "That is common after role changes. Use the access concern route instead of retrying dead reset links.",
      },
      {
        title: "I can still see partial cached app data",
        detail: "Do not rely on that as proof of access. Use the formal recovery path.",
      },
    ],
    related: ["account-access-security", "candidate-password-reset", "contact-support"],
  },
  {
    slug: "resume-upload-troubleshooting",
    title: "Resume upload or parsing is not working",
    summary:
      "How to recover from upload failures, stuck processing, or incomplete parsed resume output.",
    audience: ["candidate", "troubleshooting"],
    section: "troubleshooting",
    category: "Candidate troubleshooting",
    readMinutes: 3,
    keywords: ["resume upload failed", "resume stuck", "parsing failed", "review parsed resume"],
    whoItsFor: "Candidates blocked during resume import.",
    whatThisMeans:
      "Resume import should accelerate setup, but it must fail safely. If the parser cannot confidently extract facts, you can still continue manually.",
    steps: [
      "Retry with a clean supported file from a stable connection.",
      "Wait for processing to finish before retrying again.",
      "If parsing completes but the result is incomplete, review and fix the imported data manually.",
      "Contact support if the same clean file repeatedly fails.",
    ],
    whatHappensNext: [
      "You should still be able to continue onboarding manually even if resume import is imperfect.",
      "KairoID support can inspect the failure without needing the whole resume in the initial request.",
    ],
    commonProblems: [
      {
        title: "The parser skipped important fields",
        detail:
          "Manual review is expected. Resume import is an accelerator, not a final verification outcome.",
      },
      {
        title: "The upload spins forever",
        detail:
          "Stop retrying in loops and submit a support request with the product, route, and timestamp.",
      },
    ],
    related: ["candidate-resume-import", "candidate-career-records", "contact-support"],
  },
  {
    slug: "verification-pending-troubleshooting",
    title: "Verification is still pending or in progress",
    summary:
      "How to interpret long-running verification states across candidate, HR, and institution workflows.",
    audience: ["candidate", "hr", "institution", "troubleshooting"],
    section: "troubleshooting",
    category: "Verification troubleshooting",
    readMinutes: 4,
    keywords: ["verification pending", "in progress", "stuck review", "status taking long"],
    whoItsFor: "Users trying to understand whether a verification status is normal or stale.",
    whatThisMeans:
      "Pending and in-progress are not automatically failures. The right next step depends on whether KairoID is reviewing, waiting on a source, or waiting on corrections.",
    steps: [
      "Check the workflow timeline or detail screen for the latest visible action.",
      "Confirm whether KairoID requested more evidence, a contact update, or a downstream organization response.",
      "Avoid creating duplicate verification requests unless KairoID explicitly advises that path.",
      "If the status looks stale without explanation, contact support with the verification ID and route.",
    ],
    whatHappensNext: [
      "KairoID may continue the request automatically if the next dependency completes.",
      "A stale state should be investigated through support rather than worked around with duplicate submissions.",
    ],
    commonProblems: [
      {
        title: "Candidate accepted but nothing else happened",
        detail:
          "Check whether acceptance creates the next request immediately or only unlocks a follow-up step.",
      },
      {
        title: "Institution or HR has already responded",
        detail: "The request may still need KairoID review before it becomes terminal or verified.",
      },
    ],
    related: [
      "candidate-verification-basics",
      "hr-employment-verification",
      "institution-respond-to-request",
    ],
  },
  {
    slug: "passport-share-troubleshooting",
    title: "Public Trust Passport share is unavailable",
    summary:
      "What to do when a public Trust Passport link is expired, revoked, or no longer visible.",
    audience: ["candidate", "hr", "troubleshooting"],
    section: "troubleshooting",
    category: "Trust Passport troubleshooting",
    readMinutes: 3,
    keywords: [
      "passport unavailable",
      "share expired",
      "share revoked",
      "public passport not loading",
    ],
    whoItsFor: "Candidates and recipients troubleshooting public Trust Passport access.",
    whatThisMeans:
      "Trust Passport shares are intentionally controlled. When a share expires or is revoked, the public route should fail closed rather than quietly leaking stale data.",
    steps: [
      "Confirm you opened the full public share link.",
      "Ask the candidate whether the share is still meant to be active.",
      "If the share is expired or revoked, create a fresh one only if the candidate still wants access granted.",
      "Do not try to bypass the share flow by asking for protected candidate data outside KairoID.",
    ],
    whatHappensNext: [
      "A new share can restore access if the candidate explicitly creates it.",
      "Revoked or expired links should remain unavailable by design.",
    ],
    commonProblems: [
      {
        title: "Recipient says the page is blank or unavailable",
        detail:
          "The share may truly be gone. Check the candidate's active share state instead of assuming a frontend glitch.",
      },
      {
        title: "I need the information urgently",
        detail:
          "The candidate still controls consent. Urgency does not override share revocation or expiry.",
      },
    ],
    related: ["candidate-trust-passport", "hr-people-and-passports", "contact-support"],
  },
  {
    slug: "login-reset-troubleshooting",
    title: "Login failed or the password reset link does not work",
    summary: "How to troubleshoot sign-in and reset-link issues across KairoID products.",
    audience: ["candidate", "hr", "institution", "troubleshooting"],
    section: "troubleshooting",
    category: "Account troubleshooting",
    readMinutes: 3,
    keywords: [
      "login failed",
      "cannot login",
      "reset link invalid",
      "session expired",
      "wrong product",
    ],
    whoItsFor: "Any user blocked on login or account recovery.",
    whatThisMeans:
      "Login problems often come from the wrong product route, an expired session, or an outdated reset link rather than a broken account itself.",
    steps: [
      "Confirm you are using the correct KairoID product URL for Candidate, HR, or Institution.",
      "Use the newest reset link or token rather than retrying an older message.",
      "Log in again after a session-expired state instead of continuing from a stale page.",
      "Use support if the issue persists after a clean password reset attempt.",
    ],
    whatHappensNext: [
      "A successful reset should return you to a normal login path with the new password.",
      "If the wrong product URL caused confusion, the correct product-specific link should resolve it cleanly.",
    ],
    commonProblems: [
      {
        title: "I landed on the wrong product UI",
        detail:
          "Candidate, HR, and Institution each have separate user-facing frontends. Use the link intended for your product.",
      },
      {
        title: "The reset link keeps failing",
        detail: "Check whether a newer reset message invalidated the older one.",
      },
    ],
    related: ["candidate-password-reset", "account-access-security", "lost-work-email-access"],
  },
  {
    slug: "institution-link-unavailable",
    title: "Institution verification link is invalid, expired, revoked, or already completed",
    summary:
      "How institution users should handle unavailable public verification links without leaking request information.",
    audience: ["institution", "troubleshooting"],
    section: "troubleshooting",
    category: "Institution troubleshooting",
    readMinutes: 3,
    keywords: [
      "institution link unavailable",
      "expired token",
      "revoked token",
      "already completed request",
    ],
    whoItsFor: "Institution users opening a public KairoID verification link that no longer works.",
    whatThisMeans:
      "A secure public verification link should fail closed when it is no longer valid. That is expected behavior, not a reason to guess the underlying candidate data.",
    steps: [
      "Reopen the full secure URL from the original message if available.",
      "Check whether the request was already completed by another authorized user.",
      "Request a fresh or correct link only if the underlying workflow is still active.",
      "Use support if the link appears unavailable unexpectedly and the request should still be open.",
    ],
    whatHappensNext: [
      "KairoID may issue a new valid route if the workflow still supports response.",
      "Invalid, expired, revoked, or completed routes should not reveal extra private request details publicly.",
    ],
    commonProblems: [
      {
        title: "We already answered but someone tried the link again",
        detail:
          "That is exactly the case where the link should show a truthful terminal or unavailable state.",
      },
      {
        title: "The requester wants an urgent answer from the old link",
        detail:
          "Use the formal recovery path. Do not infer the old token state or expose data outside the contract.",
      },
    ],
    related: ["institution-public-magic-link", "institution-respond-to-request", "contact-support"],
  },
];

export const helpArticlesBySlug = new Map(helpArticles.map((article) => [article.slug, article]));

export function getHelpArticle(slug: string) {
  return helpArticlesBySlug.get(slug) ?? null;
}

export function helpArticleUrl(slug: string) {
  return siteUrl(`/help-center/${slug}`);
}

export function helpSupportUrl(
  searchParams?: URLSearchParams | Record<string, string | undefined>,
) {
  const base = new URL(siteUrl("/help-center/contact-support"));
  if (searchParams instanceof URLSearchParams) {
    searchParams.forEach((value, key) => {
      if (value) base.searchParams.set(key, value);
    });
    return base.toString();
  }

  Object.entries(searchParams ?? {}).forEach(([key, value]) => {
    if (value) base.searchParams.set(key, value);
  });
  return base.toString();
}

export function getHelpArticlesBySection(section: HelpSection) {
  return helpArticles.filter((article) => article.section === section);
}

export function getRelatedHelpArticles(article: HelpArticle) {
  return article.related
    .map((slug) => getHelpArticle(slug))
    .filter((related): related is HelpArticle => Boolean(related));
}

export function searchHelpArticles(query: string, section?: HelpSection) {
  const normalizedQuery = query.trim().toLowerCase();
  const scoped = section ? getHelpArticlesBySection(section) : helpArticles;
  if (!normalizedQuery) return scoped;

  const tokens = normalizedQuery.split(/\s+/).filter(Boolean);

  return scoped
    .map((article) => {
      const haystack = [
        article.title,
        article.summary,
        article.category,
        article.section,
        article.whoItsFor,
        article.whatThisMeans,
        ...article.audience,
        ...article.keywords,
        ...article.steps,
        ...article.whatHappensNext,
        ...article.commonProblems.flatMap((problem) => [problem.title, problem.detail]),
      ]
        .join(" ")
        .toLowerCase();

      let score = 0;
      for (const token of tokens) {
        if (article.title.toLowerCase().includes(token)) score += 6;
        if (article.summary.toLowerCase().includes(token)) score += 4;
        if (article.keywords.some((keyword) => keyword.toLowerCase().includes(token))) score += 5;
        if (haystack.includes(token)) score += 1;
      }
      return { article, score };
    })
    .filter((entry) => entry.score > 0)
    .sort(
      (left, right) =>
        right.score - left.score || left.article.title.localeCompare(right.article.title),
    )
    .map((entry) => entry.article);
}

export function helpCountsByAudience() {
  return {
    candidate: helpArticles.filter((article) => article.audience.includes("candidate")).length,
    hr: helpArticles.filter((article) => article.audience.includes("hr")).length,
    institution: helpArticles.filter((article) => article.audience.includes("institution")).length,
    accountSecurity: helpArticles.filter((article) => article.section === "account-security")
      .length,
    troubleshooting: helpArticles.filter((article) => article.section === "troubleshooting").length,
  };
}

export const featuredHelpJourneys = [
  {
    title: "I forgot my password",
    summary: "Recover access safely without sharing your password or OTP.",
    slug: "candidate-password-reset",
  },
  {
    title: "Invite unavailable",
    summary: "Troubleshoot expired, invalid, cancelled, or already-used Trust Invitations.",
    slug: "trust-invitation-unavailable",
  },
  {
    title: "OTP not received",
    summary: "Fix phone and email OTP delivery issues.",
    slug: "otp-not-received",
  },
  {
    title: "University link expired",
    summary: "Handle invalid or completed institution verification links safely.",
    slug: "institution-link-unavailable",
  },
  {
    title: "Verification still pending",
    summary: "Understand long-running verification states before creating duplicates.",
    slug: "verification-pending-troubleshooting",
  },
  {
    title: "Candidate did not receive invitation",
    summary: "HR troubleshooting for email delivery and resend decisions.",
    slug: "candidate-did-not-receive-invitation",
  },
];
