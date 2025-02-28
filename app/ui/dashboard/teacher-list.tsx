import { fetchTeacher } from "@/app/lib/data";

export default async function TeacherList() {
    const teacherList = await fetchTeacher();

    return (
      
        
            <div className="space-y-4">
                {teacherList.map((user, i) => (
                    <div key={`${user.id}-${i}`} className="flex items-center bg-green-100 p-4 rounded-lg shadow-sm">
                        <div className="flex flex-col">
                            <p className="text-lg font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                    </div>
                ))}
            </div>
        
    );
}
