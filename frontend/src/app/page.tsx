// app/page.tsx
// 'use client';
// import { useEffect, useState } from 'react';
// // import directus from '../../lib/directus';
// import { readItems } from '@directus/sdk';

// export default function HomePage() {
//   const [articles, setArticles] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchArticles = async () => {
//       const token = localStorage.getItem('token');
//       console.log({ token });
//       const data = await directus.request(readItems('articles'));
//       setArticles(data);

//       // const res = await fetch(
//       //   `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/articles`,
//       //   {
//       //     headers: { Authorization: `Bearer ${token}` },
//       //   },
//       // );
//       // const data = await res.json();
//       // setArticles(data.data);
//     };

//     fetchArticles();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">Articles</h1>
//       {articles?.map((article) => (
//         <div key={article.id} className="border p-4 mb-2 rounded">
//           <h2 className="text-xl font-semibold">{article.title}</h2>
//           <p>{article.content}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

'use client';
import { useEffect, useState } from 'react';
import { itemsApi } from '../../lib/directus';
// import { directusApi } from '../../lib/directus';

export default function HomePage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await itemsApi.readItemsArticles();
      console.log({ res });
      // const response = await directusApi.getItemsItems('articles');
      setArticles(res?.data?.data);
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <h1>Articles</h1>
      {articles.map((item: any) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
}
