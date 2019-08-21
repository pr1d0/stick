import CommentModel from '../models/comment';
import UserModel from '../models/user';
import NewsModel from '../models/news';

const commentController = {
    create ( req, res )
    {
        const commentData = {
            content: req.body.comment,
            postId: req.body.postid,
            userId: req.user.id
        };

        // ajax response?
        CommentModel
            .create(commentData)
            .then(comment => res.json(comment))
            .catch(err => res.status(500).send(err));
    },

    afterCreate ( comment, next )
    {
        pushToModelFiled(NewsModel, comment.postId, { comments: comment.id });
        pushToModelFiled(UserModel, comment.userId, { comments: comment.id });
        next();
    },
};

function pushToModelFiled ( model, id, update, options, callback )
{
    model
        .findByIdAndUpdate(
            id,
            { $push: update },
            { new: true, upsert: true },
            ( err, news ) => {
                if ( err ) console.log(err);
            }
        );

}

export default commentController