/**
 * @todo Auto-recalculate total field after votes field update
 * @todo Save/Send must be only 1 for all update/create Model actions
 */

import RatingModel from '../models/rating';
import CommentModel from '../models/comment';

const MSG_RATING_CREATED = 'New rating created';

const MSG_RATING_VOTE_CREATED = 'User first vote in this rating';

const MSG_RATING_VOTE_CHANGED = 'User change his vote';

const MSG_RATING_VOTE_UNCHANGED = 'Same vote';

const CODE_RATING_CREATED = 1;

const CODE_RATING_VOTE_CREATED = 2;

const CODE_RATING_VOTE_CHANGED = 3;

const CODE_RATING_VOTE_UNCHANGED = 4;

const result = {
    1: {
        code    : CODE_RATING_CREATED,
        message : MSG_RATING_CREATED,
        success : true
    },
    2: {
        code    : CODE_RATING_VOTE_CREATED,
        message : MSG_RATING_VOTE_CREATED,
        success : true
    },
    3: {
        code    : CODE_RATING_VOTE_CHANGED,
        message : MSG_RATING_VOTE_CHANGED,
        success : true
    },
    4: {
        code    : CODE_RATING_VOTE_UNCHANGED,
        message : MSG_RATING_VOTE_UNCHANGED,
        success : true
    },
};

const RatingController = {
    vote ( req, res )
    {
        const userVote = req.body.vote === 'up' ? 1 : -1;

        RatingModel
            .findById(req.body.ratingId)
            .exec((err, rating ) => {
                if ( err ) return res.status(500).send({ error: err });

                if ( !rating ) return RatingController.create(req, res, userVote);

                const isUserVoted = RatingController.isUserVoted(rating.voted, req.body.userId);

                const isUserChangeVote = RatingController.isUserChangeVote(rating.voted, userVote);

                if ( !isUserVoted ) return RatingController.addVote(req, res, rating);

                // If user already voted
                if ( isUserChangeVote ) {
                    RatingController.update(rating, userVote, res)
                } else {
                    res.json(RatingController.send(rating, 4))
                }
            });
    },

    calcRating ( votes )
    {
        const up = [];

        const down = [];

        votes.forEach(vote => vote.value < 0 ? down.push(vote.value) : up.push(vote.value));

        return up.length - down.length;
    },

    update ( rating, userVote, res )
    {
        rating.voted[this.voteIndex].value = userVote;

        rating.save()
            .then(rating => res.json(this.send(rating, 3)))
            .catch(err => res.status(500).send(err));
    },

    addVote ( req, res, rating )
    {
        const vote = { userId: req.body.userId, value: req.body.vote };

        rating.voted.push(vote);

        rating.save()
            .then(rating => res.json(this.send(rating, 2)))
            .catch(err => res.status(500).send(err));
    },

    create ( req, res, userVote )
    {
        const data = req.body;

        const vote = { userId: data.userId, value: userVote };

        const rating = { total: userVote, postId: data.postId, voted: vote };

        RatingModel.create(rating)
            .then(rating => res.json(this.send(rating, 1)))
            .catch(err => res.status(500).send(err));
    },

    send ( doc, code )
    {
        const rating = { total: doc.total };

        return { rating, result: { ...result[code] }};
    },

    beforeCreate ( rating, next )
    {
        rating.total = this.calcRating(rating.voted);

        next();
    },

    isUserVoted ( voted, userId )
    {
        return voted.some((vote, index) => {
            if ( vote.userId == userId ) {
                this.voteIndex = index;
                return true
            } else {
                this.voteIndex = null;
                return false
            }
        });
    },

    isUserChangeVote ( voted, userVote )
    {
        if ( this.voteIndex === null ) return false;

        return voted[this.voteIndex].value != userVote;
    }
}

export default RatingController