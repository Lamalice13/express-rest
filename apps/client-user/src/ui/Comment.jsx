import { getFullHours } from "@monorepo/shared/getFullHours";

export function Comment({ comment }) {
  return (
    <div className='flex flex-col gap-3 w-1/3'>
      <div>
        <p>{new Date(comment.timestamp).toISOString().split("T")[0]}</p>
        <p>{getFullHours()}</p>
      </div>
      <div>
        <p>{comment.text}</p>
      </div>
    </div>
  );
}
