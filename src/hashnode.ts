const request = await fetch('https://gql.hashnode.com', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        query: `
            {
                publication(host: "notes.suluh.my.id") {
                    posts(first: 5) {
                        edges {
                            node {
                                url
                                title
                            }
                        }
                    }
                }
            }
        `,
    }),
})
const { data: { publication: { posts } } } = await request.json()

const template = posts.edges.map(({ node }) => `- [${node.title}](${node.url})`)
const markdown = await Deno.readTextFile('./README.md')

const regex = /^(<!--(?:\s|)HASHNODE_BLOG:(?:START|start)(?:\s|)-->)(?:\n|)([\s\S]*?)(?:\n|)(<!--(?:\s|)HASHNODE_BLOG:(?:END|end)(?:\s|)-->)$/gm
const result = markdown.replace(regex, `$1\n${template.join('\n')}\n$3`)

await Deno.writeTextFile('./README.md', result)
