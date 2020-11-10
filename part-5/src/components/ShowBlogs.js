import React from 'react';

const ShowBlog = ({blogs}) => {
  return (
    <>
      {blogs.map(b =>
        <p style={{paddingLeft: "20px"}} key={b.id}>
          {b.title} | {b.author} | {b.url} | {b.likes}
        </p>)}
    </>
  );
};

export default ShowBlog;