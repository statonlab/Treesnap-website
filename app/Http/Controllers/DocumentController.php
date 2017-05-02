<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    public function about()
    {
        $contents = Storage::get("docs/aboutUs.md");

        return view('document')->with(['content' => $contents]);
    }

    public function policy()
    {
        $contents = Storage::get("docs/PrivacyPolicy.md");
        $contentTwo = Storage::get('docs/TermsLicense.md');

        return view('document')->with(['content' => $contents.$contentTwo]);
    }

    public function help()
    {
        $contents = Storage::get("docs/aboutUs.md");

        return view('document')->with(['content' => $contents]);
    }
}
