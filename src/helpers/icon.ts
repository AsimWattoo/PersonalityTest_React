import { MdQuestionMark } from 'react-icons/md';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

let getIcon = (ic: string) => {
    if(ic == "facebook") {
      return FaFacebook;
    } else if(ic == "instagram") {
      return FaInstagram;
    } else if(ic == "twitter") {
      return FaTwitter;
    } else if (ic == "linkedin") {
      return FaLinkedin;
    } else {
      return MdQuestionMark;
    }
  }

  export default getIcon;