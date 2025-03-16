// sanity/author.ts
```
import {defineField, defineType} from 'sanity'
export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
```

// sanity/blockContent.ts
```
import {defineType, defineArrayMember} from 'sanity'
export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
    }),
  ],
})

```

// sanity/category.ts
```
import {defineField, defineType} from 'sanity'
export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
})

```

// sanity/post.ts
```
import {defineField, defineType} from 'sanity'
export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
```

Terima kasih telah membagikan struktur schema Sanity Anda! Dari kode yang Anda berikan, saya dapat melihat bahwa Anda memiliki tiga tipe dokumen utama: `author`, `category`, dan `post`. Selain itu, Anda juga memiliki tipe `blockContent` yang digunakan untuk konten teks yang kaya (rich text) di dalam `post`.

Berdasarkan struktur ini, saya akan memberikan beberapa contoh **GROQ query** yang umum digunakan untuk proyek blog website Anda. Saya juga akan menjelaskan cara kerja setiap query.

---

### 1. **Mengambil Semua Post**
Query ini akan mengambil semua dokumen dengan tipe `post` dan mengembalikan field yang diperlukan.

```groq
*[_type == "post"] {
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  "author": author->name,
  "categories": categories[]->title,
  body
}
```

**Penjelasan:**
- `*[_type == "post"]`: Memilih semua dokumen dengan tipe `post`.
- `author->name`: Mengambil nama penulis dari referensi `author`.
- `categories[]->title`: Mengambil judul kategori dari referensi `categories`.

---

### 2. **Mengambil Post Berdasarkan Slug**
Query ini akan mengambil satu post berdasarkan `slug`.

```groq
*[_type == "post" && slug.current == $slug] {
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  "author": author->{name, image, bio},
  "categories": categories[]->title,
  body
}[0]
```

**Penjelasan:**
- `slug.current == $slug`: Filter post berdasarkan `slug`. `$slug` adalah parameter yang akan Anda kirim dari frontend.
- `[0]`: Mengambil hasil pertama dari array (karena slug unik, hanya satu post yang akan dikembalikan).

---

### 3. **Mengambil Post Terbaru**
Query ini akan mengambil post terbaru berdasarkan tanggal publikasi (`publishedAt`).

```groq
*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  "author": author->name,
  "categories": categories[]->title
}[0..4]
```

**Penjelasan:**
- `| order(publishedAt desc)`: Mengurutkan post berdasarkan `publishedAt` secara descending (terbaru ke terlama).
- `[0..4]`: Membatasi hasil query ke 5 post terbaru.

---

### 4. **Mengambil Post Berdasarkan Kategori**
Query ini akan mengambil semua post yang termasuk dalam kategori tertentu.

```groq
*[_type == "post" && $category in categories[]->title] {
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  "author": author->name,
  "categories": categories[]->title
}
```

**Penjelasan:**
- `$category in categories[]->title`: Filter post berdasarkan kategori. `$category` adalah parameter yang akan Anda kirim dari frontend.

---

### 5. **Mengambil Semua Author**
Query ini akan mengambil semua dokumen dengan tipe `author`.

```groq
*[_type == "author"] {
  _id,
  name,
  slug,
  image,
  bio
}
```

---

### 6. **Mengambil Detail Author Beserta Post Mereka**
Query ini akan mengambil detail author dan semua post yang mereka buat.

```groq
*[_type == "author" && slug.current == $slug] {
  _id,
  name,
  image,
  bio,
  "posts": *[_type == "post" && author._ref == ^._id] {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    "categories": categories[]->title
  }
}[0]
```

**Penjelasan:**
- `author._ref == ^._id`: Mengambil post yang memiliki referensi ke author yang sedang dipilih.
- `^._id`: Merujuk ke `_id` dari author yang sedang dipilih.

---

### 7. **Mengambil Semua Kategori**
Query ini akan mengambil semua dokumen dengan tipe `category`.

```groq
*[_type == "category"] {
  _id,
  title,
  description
}
```

---

### 8. **Mengambil Post dengan Pagination**
Query ini akan mengambil post dengan pagination (misalnya, 5 post per halaman).

```groq
*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  "author": author->name,
  "categories": categories[]->title
}[$start..$end]
```

**Penjelasan:**
- `$start` dan `$end`: Parameter untuk menentukan range post yang akan diambil. Misalnya, untuk halaman 1: `$start = 0`, `$end = 4`.

---

### 9. **Mengambil Post dengan Pencarian Berdasarkan Judul**
Query ini akan mencari post berdasarkan kata kunci di judul.

```groq
*[_type == "post" && title match $keyword] {
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  "author": author->name,
  "categories": categories[]->title
}
```

**Penjelasan:**
- `title match $keyword`: Mencari post yang judulnya mengandung kata kunci tertentu. `$keyword` adalah parameter yang akan Anda kirim dari frontend.

---

### 10. **Mengambil Post dengan Filter Tanggal**
Query ini akan mengambil post yang dipublikasikan setelah tanggal tertentu.

```groq
*[_type == "post" && publishedAt > $date] {
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  "author": author->name,
  "categories": categories[]->title
}
```

**Penjelasan:**
- `publishedAt > $date`: Filter post yang dipublikasikan setelah tanggal tertentu. `$date` adalah parameter yang akan Anda kirim dari frontend.

---

### Integrasi dengan Frontend
Jika Anda menggunakan framework seperti **Next.js**, Anda dapat menggunakan **Sanity Client** untuk menjalankan query GROQ ini. Contoh:

```javascript
import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: 'your-project-id',
  dataset: 'production',
  useCdn: true, // Gunakan CDN untuk performa yang lebih baik
});

// Contoh: Mengambil semua post
const query = `*[_type == "post"] {
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  "author": author->name,
  "categories": categories[]->title,
  body
}`;

client.fetch(query).then((posts) => {
  console.log(posts);
});
```

---

### Pertanyaan Lanjutan
- Apakah ada query spesifik yang ingin Anda buat?
- Apakah Anda mengalami kesulitan saat mengintegrasikan GROQ dengan frontend?
- Apakah Anda ingin mempelajari lebih dalam tentang fitur GROQ seperti filtering, sorting, atau join?

Beri tahu saya jika Anda memerlukan penjelasan lebih lanjut atau contoh lainnya! 😊