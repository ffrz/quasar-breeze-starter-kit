<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserV2Controller;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return inertia('Dashboard');
    })->name('dashboard');
    Route::get('/about', function () {
        return inertia('About');
    })->name('about');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/
    ', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('user', function () {
        return inertia('UserList');
    });
    Route::resource('users', UserController::class);

    Route::prefix('user-v2')->group(function() {
        Route::get('', [UserV2Controller::class, 'list']);
        Route::get('/add', [UserV2Controller::class, 'add']);
        Route::get('/edit/{id}', [UserV2Controller::class, 'edit']);
        Route::post('/save', [UserV2Controller::class, 'save']);
    });

});

require __DIR__ . '/auth.php';
