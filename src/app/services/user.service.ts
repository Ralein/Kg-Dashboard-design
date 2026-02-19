import { Injectable, signal } from '@angular/core';

export interface UserProfile {
    username: string;
    role: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    gender: string;
    active: boolean;
    dob: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    // Use signals for easy reactivity across components
    currentUser = signal<UserProfile>({
        username: 'johndoe',
        role: 'Admin',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        mobile: '1234567890',
        gender: 'Male',
        active: true,
        dob: '1990-01-01'
    });

    updateProfile(newData: UserProfile) {
        this.currentUser.set({ ...newData });
    }
}
