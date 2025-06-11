export interface IMember {
    id: number;
    name: string;
    email: string;
    phone: string;
    gender: 'M' | 'F';
    birthDate: string;
}

export class Member implements IMember {
    id: number;
    name: string;
    email: string;
    phone: string;
    gender: 'M' | 'F';
    birthDate: string;

    constructor(
        id: number = 0,
        name: string = '',
        email: string = '',
        phone: string = '',
        gender: 'M' | 'F' = 'M',
        birthDate: string = ''
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
        this.birthDate = birthDate;
    }

    // 정적 팩토리 메서드
    static createEmpty(): Member {
        return new Member();
    }

    static fromData(data: Partial<IMember>): Member {
        return new Member(
            data.id || 0,
            data.name || '',
            data.email || '',
            data.phone || '',
            data.gender || 'M',
            data.birthDate || ''
        );
    }
}
