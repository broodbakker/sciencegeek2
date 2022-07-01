import React from 'react'
import Link from "next/link";
//components
import { SeoHeader } from '../components/seoHeader';
import { Page404 } from '../components/templates/page404';
//variables
import { PAGE404 } from "../public/variables"

const Custom404 = () =>
  <>
    <SeoHeader subtitle="Er ging iets mis de pagina kan niet worden gevonden " />
    <Page404 />
  </>


export default Custom404;