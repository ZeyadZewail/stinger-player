import {useStingerStore} from "@/stores/useStingerStore";

export const ManageStingers = () => {
    const {stingers} = useStingerStore()

    return <div>
        {Object.values(stingers).map(s => {
            return <div key={s.id}>{s.name}</div>
        })}
    </div>
};
