const sortBlogsByLikes = (blogs) => {
  return blogs.sort((blog1,blog2) => blog1.likes < blog2.likes ? 1 : -1)
}

export { sortBlogsByLikes }