"use client";
import { Bus, BadgeCheck } from "lucide-react";
import { useState } from 'react';
import Image from "next/image";

interface Student {
    id: number;
    name: string;
    className: string;
    studentId: string;
    imageUrl: string;
}

type ListType = 'waiting' | 'onBus';

export default function Home() {
    const [waitingStudents, setWaitingStudents] = useState<Student[]>([
        {
            id: 1,
            name: "นายอิงควัชร์ โอสนานนท์",
            className: "ม.4/9",
            studentId: "27147",
            imageUrl: "/student_nick.JPG"
        },
        {
            id: 2,
            name: "นายศรัณยพงศ์ อัญญธนากร",
            className: "ม.4/9",
            studentId: "27178",
            imageUrl: "/student_cotton.JPG"
        }
    ]);
    const [onBusStudents, setOnBusStudents] = useState<Student[]>([
        {
            id: 3,
            name: "นายปุญญพัฒน์ กูลมนุญ",
            className: "ม.4/9",
            studentId: "27200",
            imageUrl: "/student_poom.JPG"
        },
        {
            id: 4,
            name: "นายณัฐสิทธิ์ มานะปิยวงศ์",
            className: "ม.4/9",
            studentId: "27194",
            imageUrl: "/student_tete.JPG"
        }
    ]);


    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: number, sourceList: ListType) => {
        e.dataTransfer.setData('text/plain', JSON.stringify({ id, sourceList }));
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetList: ListType) => {
        e.preventDefault();
        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
        const { id, sourceList } = data as { id: number; sourceList: ListType };

        if (sourceList === targetList) return;

        moveStudent(id, sourceList, targetList);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const moveStudent = (id: number, sourceList: ListType, targetList: ListType) => {
        if (sourceList === targetList) return;

        if (sourceList === 'waiting') {
            const student = waitingStudents.find(s => s.id === id);
            if (student) {
                setWaitingStudents(waitingStudents.filter(s => s.id !== id));
                setOnBusStudents([...onBusStudents, student]);
            }
        } else {
            const student = onBusStudents.find(s => s.id === id);
            if (student) {
                setOnBusStudents(onBusStudents.filter(s => s.id !== id));
                setWaitingStudents([...waitingStudents, student]);
            }
        }
    };

    const handleClick = (id: number, sourceList: ListType) => {
        const targetList = sourceList === 'waiting' ? 'onBus' : 'waiting';
        moveStudent(id, sourceList, targetList);
    };

    const StudentRow = ({ student, sourceList }: { student: Student, sourceList: ListType }) => (
        <div
            draggable
            onClick={() => handleClick(student.id, sourceList)}
            onDragStart={(e) => handleDragStart(e, student.id, sourceList)}
            className="bg-white border-b hover:bg-gray-50 cursor-pointer"
        >
            <div className="px-6 py-4">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img
                            src={student.imageUrl}
                            alt={`Student ${student.name}`}
                            className="w-10 h-10 rounded-full object-cover"
                        />


                    </div>
                    <div>
                        <div className="font-semibold text-gray-900">{student.name}</div>
                        <div className="text-xs text-gray-500 table-cell md:hidden">
                            {student.className} · เลขประจำตัว {student.studentId}
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-6 py-2 hidden md:flex items-center space-x-4">
                <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {student.className}
                </span>
                <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {student.studentId}
                </span>
                <button
                    className={`${sourceList === 'waiting'
                        ? 'bg-gray-400 hover:bg-green-800'
                        : 'bg-green-800'
                        } text-white px-3 py-1.5 rounded-lg`}
                >
                    {sourceList === 'waiting' ? 'ยังไม่ได้รับ' : 'รับขึ้นรถแล้ว'}
                </button>
            </div>
        </div>
    );

    return (
        <div className="pb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mx-4 my-8">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between rounded-lg bg-yellow-800 p-4 text-white">
                        <div>
                            <div className="text-2xl font-bold sm:text-3xl">{waitingStudents.length} คน</div>
                            <div className="text-sm">นักเรียนที่ยังไม่ได้รับ</div>
                        </div>
                        <div className="text-3xl sm:text-4xl bg-yellow-900 p-3 rounded-full">
                            <Bus />
                        </div>
                    </div>

                    <div
                        className="rounded-lg border-2 border-dashed border-yellow-800 p-4 min-h-48"
                        onDrop={(e) => handleDrop(e, 'waiting')}
                        onDragOver={handleDragOver}
                    >
                        <h3 className="text-lg font-semibold mb-4">นักเรียนที่กำลังรอ</h3>
                        <div className="divide-y">
                            {waitingStudents.map(student => (
                                <StudentRow key={student.id} student={student} sourceList="waiting" />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between rounded-lg bg-green-800 p-4 text-white">
                        <div>
                            <div className="text-2xl font-bold sm:text-3xl">{onBusStudents.length} คน</div>
                            <div className="text-sm">นักเรียนบนรถ</div>
                        </div>
                        <div className="text-3xl sm:text-4xl bg-green-900 p-3 rounded-full">
                            <BadgeCheck />
                        </div>
                    </div>

                    <div
                        className="rounded-lg border-2 border-dashed border-green-800 p-4 min-h-48"
                        onDrop={(e) => handleDrop(e, 'onBus')}
                        onDragOver={handleDragOver}
                    >
                        <h3 className="text-lg font-semibold mb-4">นักเรียนที่อยู่บนรถ</h3>
                        <div className="divide-y">
                            {onBusStudents.map(student => (
                                <StudentRow key={student.id} student={student} sourceList="onBus" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}