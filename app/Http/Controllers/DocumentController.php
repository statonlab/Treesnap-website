<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\Responds;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    use Responds;

    /**
     * Show the about page.
     *
     * @return \Illuminate\View\View
     */
    public function about()
    {
        return $this->success(Storage::get("docs/aboutUs.md"));
    }

    /**
     * Show the policy page.
     *
     * @return \Illuminate\View\View
     */
    public function policy()
    {
        $contents = Storage::get("docs/PrivacyPolicy.md");
        $contentTwo = Storage::get('docs/TermsLicense.md');

        return $this->success($contents.$contentTwo);
    }

    public function help()
    {
        $contents = Storage::get("docs/aboutUs.md");

        return view('document')->with(['content' => $contents]);
    }
}
