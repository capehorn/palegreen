
export function Article(
  id, /*number*/
  title, /*string*/
  slug, /*string*/
  description, /*string*/
  comments, /*Comment[]*/
  favorited /*boolean*/
  ) {
    this.id = id;
    this.title = title;
    this.slug = slug;
    this.description = description;
    this.comments = comments;
    this.favorited = favorited;
  }
  
export function Comment {
  id, /*number*/
  createdAt, /*Date*/
  updatedAt, /*Date*/
  body, /*string*/
  article, /*?Article*/;
}