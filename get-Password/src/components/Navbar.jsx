import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-800 text-white ">

      <div className=" flex justify-between  items-center px-4 h-14 container  mx-auto  max-w-6xl py-5 ">
        <div className="logo font-bold text-2xl">
          <span className="text-green-600">&lt; </span>
          get
          <span className="text-green-600">Pass / &gt; </span>
          
          </div>
      {/* <ul>
        <li className="flex gap-7">
          <a className="hover:font-bold" href="/">Home</a>
          <a className="hover:font-bold" href="/">About</a>
          <a className="hover:font-bold" href="/">Contact</a>
        </li>
      </ul> */}
      <div className="flex  justify-center gap-2">
        <a href="https://github.com/manthanjain2107" target="/"><img className="invert px-2  w-11 cursor-pointer" src="/icons/github.png" alt="github" title="Github" /></a>
        <a href="https://www.linkedin.com/in/manthan-jain-66a37a305?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"target="/"><img className="invert px-2  w-11 cursor-pointer" src="/icons/linkedin.png" alt="linkedin" title="Linkedin"/></a>
        {/* <a href="https://jeelspatel.netlify.app/" target="/"><img className="invert px-2  w-11 cursor-pointer" src="/icons/aboutme.png" alt="developer" title="Developer"/></a> */}
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
