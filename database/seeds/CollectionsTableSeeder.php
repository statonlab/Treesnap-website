
use Illuminate\Database\Seeder;

class CollectionsTableSeeder extends Seeder
{
/**
* Run the Collections seeder.
*
* @return void
*/
public function run()
{
\App\Collection::create([
'name' => 'User',
'is_admin' => false,
]);
}
}
