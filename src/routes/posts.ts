import {Router} from 'express';
import PostController from "controllers/PostController";
import {validatePost, validatePostId} from "../middleware/validation";
import {handleValidationResult} from "../middleware/validationResult";

const router = Router();

router.post('/posts', validatePost, handleValidationResult, PostController.createPost);
router.get('/posts', PostController.getAllPosts);
router.get('/posts/:id', validatePostId, handleValidationResult, PostController.getPost);
router.put('/posts/:id', validatePost, validatePostId, handleValidationResult, PostController.updatePost);
router.delete('/posts/:id', validatePostId, handleValidationResult, PostController.deletePost);
export default router;
