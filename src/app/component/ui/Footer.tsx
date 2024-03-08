import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
type Props = {};

function Footer({}: Props) {
  return (
    <footer className="bg-gray1 border-t-4 border-solid border-blue-500">
      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <h3 className=" text-3xl font-medium">MYSHOP</h3>
            <p className="max-w-xs mt-4 text-sm text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
              accusantium.
            </p>
            <div className="flex mt-8 space-x-6 text-gray-600">
              <a className="hover:opacity-75" target="_blank" rel="noreferrer">
                <span className="sr-only"> Facebook </span>
                <FaFacebook className="w-6 h-6" />
              </a>
              <a className="hover:opacity-75" target="_blank" rel="noreferrer">
                <span className="sr-only"> Instagram </span>
                <FaInstagram className="w-6 h-6" />
              </a>
              <a className="hover:opacity-75" target="_blank" rel="noreferrer">
                <span className="sr-only"> Twitter </span>
                <FaTwitter className="w-6 h-6" />
              </a>
              <a className="hover:opacity-75" target="_blank" rel="noreferrer">
                <span className="sr-only"> GitHub </span>
                <FaGithub className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="font-medium">Company</p>
              <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
                <a className="hover:opacity-75"> About </a>
                <a className="hover:opacity-75"> Meet the Team </a>
                <a className="hover:opacity-75"> History </a>
                <a className="hover:opacity-75"> Careers </a>
              </nav>
            </div>
            <div>
              <p className="font-medium">Services</p>
              <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
                <a className="hover:opacity-75"> 1on1 Coaching </a>
                <a className="hover:opacity-75"> Company Review </a>
                <a className="hover:opacity-75"> Accounts Review </a>
                <a className="hover:opacity-75"> HR Consulting </a>
                <a className="hover:opacity-75"> SEO Optimisation </a>
              </nav>
            </div>
            <div>
              <p className="font-medium">Helpful Links</p>
              <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
                <a className="hover:opacity-75"> Contact </a>
                <a className="hover:opacity-75"> FAQs </a>
                <a className="hover:opacity-75"> Live Chat </a>
              </nav>
            </div>
            <div>
              <p className="font-medium">Legal</p>
              <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
                <a className="hover:opacity-75"> Privacy Policy </a>
                <a className="hover:opacity-75"> Terms &amp; Conditions </a>
                <a className="hover:opacity-75"> Returns Policy </a>
                <a className="hover:opacity-75"> Accessibility </a>
              </nav>
            </div>
          </div>
        </div>
        <p className="mt-8 text-xs text-gray-800">© 2024 Viet Pham</p>
      </div>
    </footer>
  );
}

export default Footer;
