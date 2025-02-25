import CourseList from "@/app/ui/dashboard/course-list";

export default async function Page() {
    return (
        <div className= "flex flex-col items-center"> 
            <h1>Bienvenue voici la liste des cours !</h1>
            <div className="mt-6 gap-6 m ">
                <CourseList />
            </div>
        </div>
        
    );
}