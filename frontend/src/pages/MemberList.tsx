// src/pages/MemberList.tsx
import React, { useEffect, useState } from "react";
import { getMemberList, type Member } from "../services/memberService";

const MemberList: React.FC = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMemberList()
            .then(data => setMembers(data))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>로딩 중...</div>;

    return (
        <div>
            <h2>회원 리스트</h2>
            <ul>
                {members.map(member => (
                    <li key={member.id}>
                        {member.username} / {member.name} / {member.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MemberList;
