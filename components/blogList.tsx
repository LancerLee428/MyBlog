import BlogCard from "./blogCard";

const BlogList = ({ posts }) => {
  return (
    <div className="blog-header-container">
      {posts.map((post) => {
        return <BlogCard post={post} key={post.id} />;
      })}
    </div>
  );
};

export default BlogList;
