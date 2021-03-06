import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import Layout from '@components/Layout';
import Container from '@components/Container';
import CldCamera from '@components/CldCamera';

import styles from '@styles/Home.module.scss'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <CldCamera className={styles.camera} />
      </Container>
    </Layout>
  )
}