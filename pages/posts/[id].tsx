import { GraphQLClient, gql } from "graphql-request";

import Menu from "../../components/menu";

const client = new GraphQLClient(
  "https://api-ap-northeast-1.graphcms.com/v2/cl51745ug1ewz01ui5toy7p5k/master"
);

const IDLIST = gql`
  {
    posts {
      id
    }
  }
`;

const QUERY = gql`
  query ($id: ID!) {
    post(where: { id: $id }) {
      id
      title
      datePublished
      author {
        name
        avatar {
          url
        }
      }
      coverimg {
        url
      }
      content {
        html
      }
    }
  }
`;

export async function getStaticPaths() {
  const { posts } = await client.request(IDLIST);
  return {
    paths: posts.map((post) => ({ params: { id: post.id } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = await client.request(QUERY, { id: params.id });
  return {
    props: {
      post: data.post,
    },
  };
}

const Post = ({ post }) => {
  return (
    <div className="blog-wrapper">
      <div className="blog">
        <Menu />
        <div className="blog-content">
          <div className="title">{post.title}</div>

          <div className="blog-author">
            <img src={post.author.avatar.url} alt="" />
            <div>
              <div className="date">{post.datePublished}</div>
              <div>By {post.author.name}</div>
            </div>
          </div>

          <p dangerouslySetInnerHTML={{ __html: post.content.html }}></p>
          {/* <Editor content={'console.log("hello world")'} /> */}
        </div>
      </div>
    </div>
  );
};

export default Post;
