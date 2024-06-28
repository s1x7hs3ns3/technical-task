import {Request, Response} from 'express';
import {Post} from "models/Post";
import db from "models/PostgreSQL";

class PostController {
    /**
     * Inserts a post in the database
     * @param req
     * @param res
     */
    public async createPost(req: Request, res: Response): Promise<void> {
        const {title, content} = req.body;
        const created_at = new Date();

        try {
            const result = await db.query(
                'INSERT INTO posts (title, content, created_at) VALUES ($1, $2, $3) RETURNING *',
                [title, content, created_at]
            );
            const newPost: Post = result.rows[0];
            res.status(201).json(newPost);
        } catch (error) {
            res.status(500).json({message: 'Error posting: ', error});
        }
    }

    /**
     * Retrieves all posts
     * @param req
     * @param res
     */
    public async getAllPosts(req: Request, res: Response): Promise<void> {
        try {
            const result = await db.query('SELECT * FROM posts');
            const posts: Post[] = result.rows;
            res.json(posts);
        } catch (error) {
            res.status(500).json({message: 'Error retrieving posts: ', error});
        }
    }

    /**
     * Retrieves a post by id
     * @param req
     * @param res
     */
    public async getPost(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            const result = await db.query('SELECT * FROM posts WHERE id = $1', [id]);
            const post: Post = result.rows[0];
            if (post) {
                res.json(post);
            } else {
                res.status(404).json({message: 'Post not found'});
            }
        } catch (error) {
            res.status(500).json({message: 'Error retrieving post: ', error});
        }
    }

    /**
     * Updates a post by id
     * @param req
     * @param res
     */
    public async updatePost(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        const {title, content} = req.body;

        try {
            const result = await db.query(
                'UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *',
                [title, content, id]
            );
            const updatedPost: Post = result.rows[0];
            if (updatedPost) {
                res.json(updatedPost);
            } else {
                res.status(404).json({message: 'Post not found'});
            }
        } catch (error) {
            res.status(500).json({message: 'Error updating post', error});
        }
    }

    /**
     * Deletes a post by id
     * @param req
     * @param res
     */
    public async deletePost(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            const result = await db.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
            const deletedPost: Post = result.rows[0];
            if (deletedPost) {
                res.status(204).send();
            } else {
                res.status(404).json({message: 'Post not found'});
            }
        } catch (error) {
            res.status(500).json({message: 'Error deleting post: ', error});
        }
    }
}

export default new PostController();
