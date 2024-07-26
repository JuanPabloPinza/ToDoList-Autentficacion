// pages/index.tsx

import React from 'react';
import Link from 'next/link';
import { Task } from '@/models/task';
import Header from './components/Header'
import Footer from './components/Footer'
import MainContent from './components/MainContent'

const HomePage: React.FC = () => {
    return (
        <div>
            <Header />
            <MainContent />
            <Footer />
        </div>
    );
};

export default HomePage;