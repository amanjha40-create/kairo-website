import { PhoneFrame } from "./PhoneFrame";
import homeAsset from "@/assets/product/home.png.asset.json";
import vaultAsset from "@/assets/product/vault.png.asset.json";
import shareAsset from "@/assets/product/share.png.asset.json";
import profileAsset from "@/assets/product/profile.png.asset.json";
import swiggyAsset from "@/assets/product/swiggy.png.asset.json";
import uberAsset from "@/assets/product/uber.png.asset.json";
import licenseAsset from "@/assets/product/license.png.asset.json";
import onboardingAsset from "@/assets/product/onboarding.png.asset.json";
import digilockerAsset from "@/assets/product/digilocker.png.asset.json";

export const productScreens = {
  home: { src: homeAsset.url, alt: "Kairo home dashboard with live trust score" },
  vault: { src: vaultAsset.url, alt: "Trust Vault with platform experience and verified licenses" },
  share: { src: shareAsset.url, alt: "Share verified Kairo profile via QR code" },
  profile: { src: profileAsset.url, alt: "Kairo professional profile with trust score" },
  swiggy: { src: swiggyAsset.url, alt: "Verified Swiggy platform experience inside Kairo" },
  uber: { src: uberAsset.url, alt: "Pending Uber verification inside Kairo" },
  license: { src: licenseAsset.url, alt: "Verified driving license inside Kairo" },
  onboarding: { src: onboardingAsset.url, alt: "Kairo onboarding — choose your profile type" },
  digilocker: { src: digilockerAsset.url, alt: "DigiLocker identity verified inside Kairo" },
};

export { PhoneFrame };
