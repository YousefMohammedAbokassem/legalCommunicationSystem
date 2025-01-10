import React from "react";
import { useTranslation } from "react-i18next";
import { Facebook, Twitter, LinkedIn, Instagram } from "@mui/icons-material"; // Icons for social media

export default function OurServices() {
  const [t] = useTranslation();

  return (
    <footer className="bg-[var(--clr-product)] py-12 text-white footer">
      <div className="container mx-auto px-6">
        {/* Footer Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-10 md:space-y-0">
          {/* Contact Information */}
          <div className="flex flex-col items-center md:items-start md:w-1/3">
            <h2 className="text-3xl font-extrabold mb-4">{t("contactUs")}</h2>
            <p className="text-lg mb-4">{t("contactDescription")}</p>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
              <a
                href="tel:+1234567890"
                className="flex items-center text-xl hover:text-gray-300"
                title="Call Us"
              >
                {/* <ChatIcon className="mr-2" /> */}
                +123 456 7890
              </a>
              <a
                href="mailto:info@company.com"
                className="flex items-center text-xl hover:text-gray-300"
                title="Email Us"
              >
                info@company.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:w-1/3 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="hover:text-gray-300 text-lg"
                >
                  {t("home")}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-gray-300 text-lg"
                >
                  {t("services")}
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-gray-300 text-lg"
                >
                  {t("about")}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-gray-300 text-lg"
                >
                  {t("contact")}
                </a>
              </li>
            </ul>
          </div>
    

          {/* Social Media Icons */}
          <div className="md:w-1/3 flex justify-center md:justify-center space-x-6">
            <a
              href="https://facebook.com"
              className="text-2xl hover:text-gray-300"
              title="Facebook"
            >
              <Facebook />
            </a>
            <a
              href="https://twitter.com"
              className="text-2xl hover:text-gray-300"
              title="Twitter"
            >
              <Twitter />
            </a>
            <a
              href="https://linkedin.com"
              className="text-2xl hover:text-gray-300"
              title="LinkedIn"
            >
              <LinkedIn />
            </a>
            <a
              href="https://instagram.com"
              className="text-2xl hover:text-gray-300"
              title="Instagram"
            >
              <Instagram />
            </a>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-gray-600 pt-6 text-center">
          <p className="text-sm mb-2">
            &copy; {new Date().getFullYear()} {t("companyName")}. {t("allRightsReserved")}
          </p>
          <p className="text-sm text-gray-400">
            {t("address")}: 123 Main Street, City, Country
          </p>
        </div>
      </div>
    </footer>
  );
}
