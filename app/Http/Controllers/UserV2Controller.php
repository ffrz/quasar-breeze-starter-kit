<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserV2Controller extends Controller
{
    public function list(Request $request)
    {
        return inertia('UserV2/List');
    }

    public function add(Request $request)
    {
        $user = new User();
        $user->active = true;
        $user->admin = true;
        return inertia('UserV2/Editor', [
            'data' => $user,
        ]);
    }

    public function edit(Request $request, $id)
    {
        $user = User::findOrFail($id);

        if ($user == Auth::user()) {
            return redirect('/user-v2')->with('warning', 'Can not edit current user.');
        }

        return inertia('UserV2/Editor', [
            'data' => $user,
        ]);
    }

    public function index(Request $request)
    {
        $orderBy = $request->get('order_by', 'name');
        $orderType = $request->get('order_type', 'asc');
        $search = $request->get('filter', '');

        $q = User::query();
        $q->orderBy($orderBy, $orderType);
        if (!empty($search)) {
            $q->where('name', 'like', '%' . $search . '%');
            $q->orWhere('email', 'like', '%' . $search . '%');
        }

        $users = $q->paginate($request->get('per_page', 10))->withQueryString();

        return response()->json($users);
    }

    public function save(Request $request)
    {
        $rules = [
            'name' => 'required|max:255',
            'email' => 'required|unique:users,email,' . $request->id . '|min:3|max:100',
            'password' => 'required|min:5|max:40',
        ];

        $message = '';
        if (!$request->id) {
            $request->validate($rules);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->string('password')),
                'active' => $request->active,
                'admin' => $request->admin,
            ]);

            $message = 'New user created.';
        } else {
            if (empty($request->get('password'))) {
                unset($rules['password']);
            }
            $request->validate($rules);

            $user = User::findOrFail($request->id);
            $user->fill($request->only(['name', 'email', 'admin', 'active']));
            if (!empty($request->get('password'))) {
                $user->password = Hash::make($request->string('password'));
            }
            $user->save();
            $message = 'User updated.';
        }

        return redirect('/user-v2')->with('success', $message);
    }

    public function delete($id)
    {
        $user = User::findOrFail($id);

        if ($user->id == Auth::user()->id) {
            return response()->json([
                'message' => 'Cannot delete current user!'
            ], 409);
        }

        $user->delete();

        return response()->json([
            'message' => 'User successfully deleted!'
        ]);
    }
}
