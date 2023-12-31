import React from 'react';
import { useRouter } from 'next/router';

import { getCategories, getCategoryPost } from '../../services';
import { PostCard, Categories, Loader } from '../../components';

const CategoryPost = ({posts}) => {
    const router = useRouter();
    if (router.isFallback) {
        return <Loader />
    }

    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-col cols-1 lg:grid-cols-12 gap-12">
                <div className="col-span-1 lg:col-span-8">
                    {posts.map((post, index) => (
                        <PostCard key={index} post={post.node} />
                    ))}
                </div>
                <div className="col-span-1 lg:col-span-4">
                    <div className="relative lg:sticky top-8">
                        <Categories />
                    </div>
                </div>
            </div>
            
            <div className="w-full bg-transparent">
                <p className=" bg-transparent text-center text-cyan-50 font-bold pt-8">@2023 The Western Conservador</p>
                <p className="bg-transparent text-center text-white font-sans pb-4">All rights reserved</p>
            </div>
        </div>

    );
};

export default CategoryPost;

//fetch data at build time
export async function getStaticProps({params}) {
    const posts = await getCategoryPost(params.slug);

    return {
        props: {posts}, 
    };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.

export async function getStaticPaths() {
    const categories = await getCategories();
    return {
        paths: categories.map(({ slug }) => ({ params: { slug } })),
        fallback: true,
    }
}
