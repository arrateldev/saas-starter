import type { IconType } from 'react-icons';
import {
  FaBluesky,
  FaDocker,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaNpm,
  FaProductHunt,
  FaRedditAlien,
  FaTiktok,
  FaXTwitter,
  FaYoutube
} from 'react-icons/fa6';
import type { SocialIconName } from '@/lib/site-config';

export const socialIcons: Record<SocialIconName, IconType> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  x: FaXTwitter,
  bluesky: FaBluesky,
  instagram: FaInstagram,
  tiktok: FaTiktok,
  youtube: FaYoutube,
  productHunt: FaProductHunt,
  npm: FaNpm,
  dockerHub: FaDocker,
  reddit: FaRedditAlien
};
