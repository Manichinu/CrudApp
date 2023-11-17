import { useDispatch } from "react-redux";
import { reactionAdded } from "./postSlice";

const reactionEmoji = {
    like: '👍',
    smile: '😂',
    heart: '❤️'
}

const Reactions = ({ post }) => {
    const dispatch = useDispatch()
    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button className="reaction_btn" onClick={() => dispatch(reactionAdded({
                postId: post.id, reaction: name
            }))} type="button">{emoji} {post.reactions[name]}</button>
        )
    })
    return (
        <div>{reactionButtons}</div>
    )
}

export default Reactions;