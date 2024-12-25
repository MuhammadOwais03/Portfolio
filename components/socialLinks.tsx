import "boxicons/css/boxicons.min.css"; // Importing Boxicons
import './styles/social.css'

const SocialLinks = () => {
    return (
        <div className=" social flex justify-center space-x-4 p-4 bg-background">
            {/* LinkedIn */}
            <a
                href="https://linkedin.com/in/muhammad-owais-1b782b269/"
                className="flex items-center justify-center"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
            >
                <i className="bx bxl-linkedin"></i>
            </a>
            {/* GitHub */}
            <a
                href="https://github.com/MuhammadOwais03/"
                className="flex items-center justify-center"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
            >
                <i className="bx bxl-github"></i>
            </a>
            {/* Email */}
            <a
                href="mailto:owaisiqbal2021@gmail.com"
                className="flex items-center justify-center"
                aria-label="Email"
            >
                <i className="bx bx-envelope"></i>
            </a>
        </div>
    );
};

export default SocialLinks;
