import { Icon } from "@iconify/react";

export default function Item(props) {
  // set State
  const {
    item: { id, petName, ownerName, aptNotes, aptDate },
    deleteItem,
  } = props;


  return (
    <>
      {
        <div
          key={id}
          className="w-9/12 mt-5 pb-3 border-b-[3px] flex justify-between"
        >
          <div className="flex">
            <Icon
              onClick={() => deleteItem(id)}
              icon="material-symbols:delete-outline"
              className="w-7 h-7 bg-red-400 mr-2 rounded-md text-white"
            />
            <div>
              <h3 className="text-xl font-bold text-blue-400">{petName}</h3>
              <p>
                <span className="text-lg font-medium text-blue-400">
                  Owner:
                </span>{" "}
                {ownerName}
              </p>
              <p>{aptNotes}</p>
            </div>
          </div>
          <div className="text-sm">
            <p>{aptDate}</p>
          </div>
        </div>
      }
    </>
  );
}
